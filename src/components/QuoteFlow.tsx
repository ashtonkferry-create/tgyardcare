'use client';

import { useState, useCallback } from 'react';
import { Check, ChevronRight, ChevronLeft, Loader2, Calendar, Home, MapPin, Mail, Phone, User } from 'lucide-react';
import { ConciergeConfirmation } from '@/components/ConciergeConfirmation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useServices } from '@/hooks/useServices';
import { usePricingByService, useSeasonalModifier, formatPriceRange, formatPrice } from '@/hooks/usePricing';
import { useLocations } from '@/hooks/useLocations';
import { useSubmitLead, calculateLeadScore, type LeadInsert } from '@/hooks/useLeads';

// Step definitions
const STEPS = [
  { id: 'service', label: 'Service', icon: Check },
  { id: 'property', label: 'Property', icon: Home },
  { id: 'frequency', label: 'Frequency', icon: Calendar },
  { id: 'pricing', label: 'Your Price', icon: Check },
  { id: 'contact', label: 'Contact', icon: User },
  { id: 'confirm', label: 'Confirm', icon: Check },
] as const;

type StepId = typeof STEPS[number]['id'];

// Property size options
const LOT_SIZES = [
  { value: 'small', label: 'Small', description: 'Under 1/4 acre' },
  { value: 'medium', label: 'Medium', description: '1/4 - 1/2 acre' },
  { value: 'large', label: 'Large', description: '1/2 - 1 acre' },
  { value: 'xlarge', label: 'Extra Large', description: 'Over 1 acre' },
];

// Frequency options
const FREQUENCIES = [
  { value: 'weekly', label: 'Weekly', discount: 0.15, description: 'Best value - 15% off' },
  { value: 'biweekly', label: 'Every 2 Weeks', discount: 0.10, description: '10% off' },
  { value: 'monthly', label: 'Monthly', discount: 0, description: 'Standard pricing' },
  { value: 'one-time', label: 'One-Time', discount: 0, description: 'Single service' },
];

interface QuoteFlowProps {
  initialService?: string;
  initialTier?: string;
  onComplete?: (leadId: string) => void;
  className?: string;
}

interface FormData {
  serviceId: string;
  serviceName: string;
  tier: 'good' | 'better' | 'best';
  lotSize: string;
  locationId: string;
  frequency: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  notes: string;
  referralSource: string;
}

export function QuoteFlow({ initialService, initialTier, onComplete, className = '' }: QuoteFlowProps) {
  const [currentStep, setCurrentStep] = useState<StepId>('service');
  const [formData, setFormData] = useState<FormData>({
    serviceId: '',
    serviceName: '',
    tier: (initialTier as 'good' | 'better' | 'best') || 'better',
    lotSize: 'medium',
    locationId: '',
    frequency: 'biweekly',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    notes: '',
    referralSource: '',
  });

  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: locations } = useLocations();
  const { data: pricing } = usePricingByService(formData.serviceId, formData.locationId || undefined);
  const { data: seasonalModifier } = useSeasonalModifier(formData.serviceId);
  const submitLead = useSubmitLead();

  // Calculate estimated price
  const calculatePrice = useCallback(() => {
    if (!pricing || pricing.length === 0) return null;

    const tierPricing = pricing.find(p => p.tier === formData.tier) || pricing[0];
    if (!tierPricing) return null;

    let basePrice = (tierPricing.price_min + tierPricing.price_max) / 2;

    // Apply lot size multiplier
    const lotMultipliers: Record<string, number> = {
      small: 0.8,
      medium: 1.0,
      large: 1.3,
      xlarge: 1.6,
    };
    basePrice *= lotMultipliers[formData.lotSize] || 1;

    // Apply seasonal modifier
    if (seasonalModifier) {
      basePrice *= seasonalModifier.multiplier;
    }

    // Apply frequency discount
    const frequencyOption = FREQUENCIES.find(f => f.value === formData.frequency);
    if (frequencyOption) {
      basePrice *= (1 - frequencyOption.discount);
    }

    return Math.round(basePrice);
  }, [pricing, formData.tier, formData.lotSize, formData.frequency, seasonalModifier]);

  const estimatedPrice = calculatePrice();

  // Navigation
  const stepIndex = STEPS.findIndex(s => s.id === currentStep);
  const canGoBack = stepIndex > 0;
  const canGoNext = stepIndex < STEPS.length - 1;

  const goToStep = (step: StepId) => setCurrentStep(step);
  const goNext = () => {
    if (canGoNext) {
      setCurrentStep(STEPS[stepIndex + 1].id);
    }
  };
  const goBack = () => {
    if (canGoBack) {
      setCurrentStep(STEPS[stepIndex - 1].id);
    }
  };

  // Form handlers
  const updateForm = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Submit handler
  const handleSubmit = async () => {
    const leadData: LeadInsert = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      service_id: formData.serviceId || null,
      location_id: formData.locationId || null,
      tier: formData.tier,
      frequency: formData.frequency,
      lot_size: formData.lotSize,
      notes: formData.notes || null,
      referral_source: formData.referralSource || null,
      quoted_price: estimatedPrice,
    };

    // Calculate and set lead score
    leadData.lead_score = calculateLeadScore(leadData);

    submitLead.mutate(leadData, {
      onSuccess: (data) => {
        goNext();
        onComplete?.(data.id);
      },
    });
  };

  // Validation
  const isStepValid = (step: StepId): boolean => {
    switch (step) {
      case 'service':
        return !!formData.serviceId;
      case 'property':
        return !!formData.lotSize;
      case 'frequency':
        return !!formData.frequency;
      case 'pricing':
        return true;
      case 'contact':
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      default:
        return true;
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'service':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">What service do you need?</h2>
              <p className="text-muted-foreground">Select the service you're interested in</p>
            </div>

            {servicesLoading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {services?.map(service => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all hover:border-primary ${
                      formData.serviceId === service.id ? 'border-2 border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => updateForm({ serviceId: service.id, serviceName: service.name })}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{(service as any).tagline}</p>
                        </div>
                        {formData.serviceId === service.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'property':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Tell us about your property</h2>
              <p className="text-muted-foreground">This helps us provide an accurate estimate</p>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Lot Size</Label>
              <RadioGroup
                value={formData.lotSize}
                onValueChange={(value) => updateForm({ lotSize: value })}
                className="grid gap-3 md:grid-cols-2"
              >
                {LOT_SIZES.map(size => (
                  <Label
                    key={size.value}
                    htmlFor={size.value}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                      formData.lotSize === size.value ? 'border-2 border-primary bg-primary/5' : ''
                    }`}
                  >
                    <RadioGroupItem value={size.value} id={size.value} />
                    <div>
                      <span className="font-medium">{size.label}</span>
                      <p className="text-sm text-muted-foreground">{size.description}</p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {locations && locations.length > 0 && (
              <div className="space-y-4">
                <Label className="text-base font-medium">Your Location</Label>
                <div className="grid gap-2 md:grid-cols-3">
                  {locations.slice(0, 9).map(location => (
                    <Button
                      key={location.id}
                      variant={formData.locationId === location.id ? 'default' : 'outline'}
                      className="justify-start"
                      onClick={() => updateForm({ locationId: location.id, city: location.name })}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {location.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'frequency':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">How often do you need service?</h2>
              <p className="text-muted-foreground">Regular service saves you money</p>
            </div>

            <RadioGroup
              value={formData.frequency}
              onValueChange={(value) => updateForm({ frequency: value })}
              className="grid gap-4"
            >
              {FREQUENCIES.map(freq => (
                <Label
                  key={freq.value}
                  htmlFor={freq.value}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                    formData.frequency === freq.value ? 'border-2 border-primary bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={freq.value} id={freq.value} />
                    <div>
                      <span className="font-medium">{freq.label}</span>
                      <p className="text-sm text-muted-foreground">{freq.description}</p>
                    </div>
                  </div>
                  {freq.discount > 0 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Save {freq.discount * 100}%
                    </Badge>
                  )}
                </Label>
              ))}
            </RadioGroup>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Your Estimated Price</h2>
              <p className="text-muted-foreground">Based on your selections</p>
            </div>

            <Card className="bg-primary/5 border-primary">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {estimatedPrice ? formatPrice(estimatedPrice) : '—'}
                </div>
                <p className="text-muted-foreground">
                  {formData.frequency === 'one-time' ? 'per service' : `per ${formData.frequency === 'weekly' ? 'week' : formData.frequency === 'biweekly' ? 'visit' : 'month'}`}
                </p>

                {seasonalModifier && (
                  <Badge variant="secondary" className="mt-4">
                    {seasonalModifier.label} rates applied
                  </Badge>
                )}
              </CardContent>
            </Card>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Service:</span>
                <span className="font-medium">{formData.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span>Tier:</span>
                <span className="font-medium capitalize">{formData.tier}</span>
              </div>
              <div className="flex justify-between">
                <span>Lot Size:</span>
                <span className="font-medium capitalize">{formData.lotSize}</span>
              </div>
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span className="font-medium capitalize">{formData.frequency.replace('-', ' ')}</span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              * Final price may vary based on property inspection
            </p>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Almost there!</h2>
              <p className="text-muted-foreground">We just need your contact information</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateForm({ firstName: e.target.value })}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateForm({ lastName: e.target.value })}
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => updateForm({ phone: e.target.value })}
                    placeholder="(608) 555-1234"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateForm({ address: e.target.value })}
                placeholder="123 Main St"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateForm({ city: e.target.value })}
                  placeholder="Madison"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={formData.zip}
                  onChange={(e) => updateForm({ zip: e.target.value })}
                  placeholder="53703"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateForm({ notes: e.target.value })}
                placeholder="Any special requests or information..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="referral">How did you hear about us?</Label>
              <Input
                id="referral"
                value={formData.referralSource}
                onChange={(e) => updateForm({ referralSource: e.target.value })}
                placeholder="Google, neighbor, etc."
              />
            </div>
          </div>
        );

      case 'confirm':
        return (
          <ConciergeConfirmation
            open={true}
            onClose={() => {}}
            mode="inline"
            submittedMessage={formData.serviceName}
          />
        );
    }
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Progress Steps */}
      {currentStep !== 'confirm' && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.slice(0, -1).map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = index < stepIndex;

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => isCompleted && goToStep(step.id)}
                    disabled={!isCompleted}
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                      isCompleted
                        ? 'bg-primary text-primary-foreground cursor-pointer'
                        : isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                  </button>
                  {index < STEPS.length - 2 && (
                    <div
                      className={`w-12 md:w-24 h-1 mx-1 ${
                        index < stepIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.slice(0, -1).map((step) => (
              <span
                key={step.id}
                className={`text-xs ${
                  step.id === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      <Card>
        <CardContent className="p-6 md:p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      {currentStep !== 'confirm' && (
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={!canGoBack}
            className={!canGoBack ? 'invisible' : ''}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep === 'contact' ? (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid(currentStep) || submitLead.isPending}
            >
              {submitLead.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Quote Request
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={goNext}
              disabled={!isStepValid(currentStep)}
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default QuoteFlow;
