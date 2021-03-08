export interface Telepon {
  readonly type: 'fixed' | 'mobile' | 'emergency';
  readonly originalNumber: string;
}

export interface FixedTelepon extends Telepon {
  readonly region: string;
  readonly area: number;
}

export interface MobileTelepon extends Telepon {
  readonly card: string;
  readonly provider: string;
}
