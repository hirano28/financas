import { Inject, Injectable, Optional } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class PtBrDateAdapter extends NativeDateAdapter {
  constructor(@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string) {
    super(matDateLocale || 'pt-BR');
  }

  override parse(value: unknown): Date | null {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      const m = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (m) {
        const d = parseInt(m[1], 10);
        const mm = parseInt(m[2], 10) - 1;
        const y = parseInt(m[3], 10);
        const dt = new Date(y, mm, d);
        if (dt && dt.getFullYear() === y && dt.getMonth() === mm && dt.getDate() === d) {
          return dt;
        }
        return null;
      }
    }
    // Fallback to native parsing for Date or ISO-like strings
    return super.parse(value as any);
  }

  override format(date: Date, displayFormat: any): string {
    const day = this._to2digit(date.getDate());
    const month = this._to2digit(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private _to2digit(n: number): string {
    return ('00' + n).slice(-2);
  }
}

export const PT_BR_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};
