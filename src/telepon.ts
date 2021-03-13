export interface Telepon {
  readonly type: 'fixed' | 'mobile' | 'emergency';
  readonly originalNumber: string;
}

export interface FixedTelepon extends Telepon {
  readonly type: 'fixed';
  readonly region: string[] | null;
  readonly area: number | null;
}

export interface MobileTelepon extends Telepon {
  readonly type: 'mobile';
  readonly card: string;
  readonly provider: string;
}

export interface EmergencyService extends Telepon {
  readonly type: 'emergency';
  readonly description: string;
}
