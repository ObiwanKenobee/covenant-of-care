
export type TerrainContext = 'desert' | 'empire' | 'borderland';
export type GovernanceModel = 'nomadic' | 'ducal' | 'interfaith-council';

export interface SacredLocation {
  id: string;
  name: string;
  type: 'burial-ground' | 'prayer-site' | 'migration-path' | 'water-source';
  coordinates: [number, number];
  protectionLevel: 'absolute' | 'conditional' | 'consultative';
}

export interface EthicsDecision {
  id: string;
  action: string;
  timestamp: Date;
  context: TerrainContext;
  impactAreas: {
    soil: number;
    water: number;
    memory: number;
    trust: number;
    spirit: number;
  };
  approved: boolean;
  overrideAuthority?: string;
  justification: string;
}

export interface CovenantUser {
  id: string;
  role: 'steward' | 'elder' | 'nomad' | 'duke' | 'ethicist' | 'ai-whisperer';
  location: TerrainContext;
  permissions: string[];
  culturalContext: string;
}
