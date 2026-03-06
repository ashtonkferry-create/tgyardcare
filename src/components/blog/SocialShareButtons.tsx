'use client';

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Mail, Copy, Check } from 'lucide-react';

interface SocialShareButtonsProps {
  title: string;
  slug: string;
  excerpt: string;
}

const SHARE_CHANNELS = [
  {
    name: 'Facebook',
    icon: Facebook,
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'X',
    icon: Twitter,
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Email',
    icon: Mail,
    getUrl: (url: string, title: string, excerpt: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${excerpt}\n\nRead more: ${url}`)}`,
  },
] as const;

export default function SocialShareButtons({
  title,
  slug,
  excerpt,
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://tgyardcare.com/blog/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-white/50 mr-1">Share:</span>
      {SHARE_CHANNELS.map((channel) => {
        const Icon = channel.icon;
        const href = channel.getUrl(fullUrl, title, excerpt);
        const isEmail = channel.name === 'Email';

        return (
          <a
            key={channel.name}
            href={href}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener noreferrer'}
            aria-label={`Share on ${channel.name}`}
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg
              bg-white/[0.06] border border-white/10
              text-white/60 hover:text-white hover:bg-white/[0.12] hover:border-primary/30
              transition-all duration-200 hover:scale-105"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}

      {/* Copy Link Button */}
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className={`inline-flex items-center justify-center h-9 gap-1.5 rounded-lg
          border transition-all duration-200 hover:scale-105 px-3
          ${
            copied
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-white/[0.06] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.12] hover:border-primary/30'
          }`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            <span className="text-xs font-medium">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span className="text-xs font-medium">Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
