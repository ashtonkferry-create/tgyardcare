'use client';

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { compressToWebP, bulkCompressToWebP, imageDimensions } from "@/lib/imageCompression";
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ImageConverter() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [results, setResults] = useState<Array<{
    original: string;
    converted?: string;
    success: boolean;
    error?: string;
    sizeBefore: number;
    sizeAfter?: number;
  }>>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      toast.error("Please select valid image files");
      return;
    }

    setSelectedFiles(imageFiles);
    setResults([]);
  };

  const convertImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select images to convert");
      return;
    }

    setConverting(true);
    const conversionResults: typeof results = [];

    try {
      for (const file of selectedFiles) {
        try {
          const compressed = await compressToWebP(file, imageDimensions.service);
          const compressedUrl = URL.createObjectURL(compressed);

          conversionResults.push({
            original: file.name,
            converted: compressedUrl,
            success: true,
            sizeBefore: file.size,
            sizeAfter: compressed.size
          });
        } catch (error) {
          conversionResults.push({
            original: file.name,
            success: false,
            error: error instanceof Error ? error.message : "Conversion failed",
            sizeBefore: file.size
          });
        }
      }

      setResults(conversionResults);

      const successCount = conversionResults.filter(r => r.success).length;
      if (successCount > 0) {
        toast.success(`Successfully converted ${successCount} image(s) to WebP`);
      }

      const failureCount = conversionResults.filter(r => !r.success).length;
      if (failureCount > 0) {
        toast.error(`Failed to convert ${failureCount} image(s)`);
      }
    } catch (error) {
      toast.error("Error during conversion");
      console.error(error);
    } finally {
      setConverting(false);
    }
  };

  const downloadAll = () => {
    results
      .filter(r => r.success && r.converted)
      .forEach((result, index) => {
        const link = document.createElement('a');
        link.href = result.converted!;
        link.download = result.original.replace(/\.[^.]+$/, '.webp');
        document.body.appendChild(link);

        setTimeout(() => {
          link.click();
          document.body.removeChild(link);
        }, index * 100);
      });

    toast.success("Downloading converted images...");
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const calculateSavings = () => {
    const totalBefore = results.reduce((sum, r) => sum + r.sizeBefore, 0);
    const totalAfter = results.reduce((sum, r) => sum + (r.sizeAfter || 0), 0);
    const savings = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);
    return { totalBefore, totalAfter, savings };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Image to WebP Converter</h1>
          <p className="text-muted-foreground">
            Convert and compress images to WebP format for optimal website performance
          </p>
        </div>

        <div className="grid gap-6">
          {/* Upload Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Images
              </CardTitle>
              <CardDescription>
                Select one or more images to convert to WebP format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="flex-1 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <Button
                    onClick={convertImages}
                    disabled={selectedFiles.length === 0 || converting}
                  >
                    {converting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      "Convert to WebP"
                    )}
                  </Button>
                </div>

                {selectedFiles.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {selectedFiles.length} file(s) selected
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          {results.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Conversion Results
                    </CardTitle>
                    <CardDescription>
                      {results.filter(r => r.success).length} of {results.length} images converted successfully
                    </CardDescription>
                  </div>
                  {results.some(r => r.success) && (
                    <Button onClick={downloadAll} variant="outline">
                      Download All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Summary */}
                  {results.some(r => r.success) && (
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Compression Summary</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Original Size</p>
                          <p className="font-semibold">{formatBytes(calculateSavings().totalBefore)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Compressed Size</p>
                          <p className="font-semibold">{formatBytes(calculateSavings().totalAfter)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Space Saved</p>
                          <p className="font-semibold text-primary">{calculateSavings().savings}%</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Individual Results */}
                  <div className="space-y-2">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {result.success ? (
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{result.original}</p>
                            {result.success && result.sizeAfter && (
                              <p className="text-xs text-muted-foreground">
                                {formatBytes(result.sizeBefore)} → {formatBytes(result.sizeAfter)}
                                {' '}
                                ({((result.sizeBefore - result.sizeAfter) / result.sizeBefore * 100).toFixed(1)}% smaller)
                              </p>
                            )}
                            {result.error && (
                              <p className="text-xs text-destructive">{result.error}</p>
                            )}
                          </div>
                        </div>
                        {result.success && result.converted && (
                          <a
                            href={result.converted}
                            download={result.original.replace(/\.[^.]+$/, '.webp')}
                            className="text-sm text-primary hover:underline whitespace-nowrap ml-2"
                          >
                            Download
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Guidelines Card */}
          <Card>
            <CardHeader>
              <CardTitle>WebP Conversion Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Hero Images:</strong> Max 1920px, target ~1MB or less</p>
                <p><strong>Service Cards:</strong> Max 800px, target ~500KB or less</p>
                <p><strong>Thumbnails:</strong> Max 400px, target ~200KB or less</p>
                <p><strong>Before/After:</strong> Max 1200px, target ~800KB or less</p>
                <p className="pt-2 border-t border-border">
                  WebP format provides superior compression while maintaining visual quality,
                  resulting in faster page loads and better SEO performance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer showCloser={false} />
    </div>
  );
}
