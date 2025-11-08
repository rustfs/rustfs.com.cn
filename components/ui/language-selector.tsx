'use client'
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Globe } from 'lucide-react';

const languages = [
  { code: 'zh', label: '中文', url: 'https://rustfs.com.cn' },
  { code: 'en', label: 'English', url: 'https://rustfs.com' }
];

export default function LanguageToggle() {
  const handleLanguageChange = (url: string) => {
    window.location.href = url;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">中文</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.url)}
            className={lang.code === 'zh' ? 'bg-accent' : ''}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
