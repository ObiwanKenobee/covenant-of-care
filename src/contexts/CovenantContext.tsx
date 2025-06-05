
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TerrainContext, GovernanceModel, CovenantUser, SacredLocation } from '../types/covenant';

interface CovenantContextType {
  terrainContext: TerrainContext;
  governanceModel: GovernanceModel;
  currentUser: CovenantUser | null;
  sacredLocations: SacredLocation[];
  currentPrayer: string;
  setTerrainContext: (context: TerrainContext) => void;
  setGovernanceModel: (model: GovernanceModel) => void;
  setCurrentUser: (user: CovenantUser) => void;
  updatePrayer: () => void;
}

const CovenantContext = createContext<CovenantContextType | undefined>(undefined);

interface CovenantProviderProps {
  children: ReactNode;
}

export const CovenantProvider: React.FC<CovenantProviderProps> = ({ children }) => {
  const [terrainContext, setTerrainContext] = useState<TerrainContext>('desert');
  const [governanceModel, setGovernanceModel] = useState<GovernanceModel>('nomadic');
  const [currentUser, setCurrentUser] = useState<CovenantUser | null>(null);
  const [sacredLocations, setSacredLocations] = useState<SacredLocation[]>([]);
  const [currentPrayer, setCurrentPrayer] = useState('');

  const prayers = {
    desert: {
      sunrise: "As water flows through parched earth, let wisdom flow through our decisions.",
      midday: "In the heat of action, grant us the shade of reflection.",
      sunset: "May our footsteps honor those who walked before us."
    },
    empire: {
      sunrise: "Let authority serve justice, and power bow to mercy.",
      midday: "In halls of governance, let the voice of the humble be heard.",
      sunset: "May our legacy be measured in lives lifted, not treasures hoarded."
    },
    borderland: {
      sunrise: "Where worlds meet, let understanding bridge difference.",
      midday: "In the space between, find sacred ground.",
      sunset: "Honor both traditions as we forge new paths."
    }
  };

  const updatePrayer = () => {
    const hour = new Date().getHours();
    let timeOfDay: 'sunrise' | 'midday' | 'sunset';
    
    if (hour < 10) timeOfDay = 'sunrise';
    else if (hour < 16) timeOfDay = 'midday';
    else timeOfDay = 'sunset';
    
    setCurrentPrayer(prayers[terrainContext][timeOfDay]);
  };

  useEffect(() => {
    updatePrayer();
    // Update prayer every hour
    const interval = setInterval(updatePrayer, 3600000);
    return () => clearInterval(interval);
  }, [terrainContext]);

  useEffect(() => {
    // Mock sacred locations - in real app would fetch from API
    setSacredLocations([
      {
        id: '1',
        name: 'Ancient Well of Remembrance',
        type: 'water-source',
        coordinates: [35.2137, 31.7683],
        protectionLevel: 'absolute'
      },
      {
        id: '2',
        name: 'Nomad Migration Path',
        type: 'migration-path',
        coordinates: [34.8021, 32.1056],
        protectionLevel: 'conditional'
      }
    ]);
  }, []);

  const value = {
    terrainContext,
    governanceModel,
    currentUser,
    sacredLocations,
    currentPrayer,
    setTerrainContext,
    setGovernanceModel,
    setCurrentUser,
    updatePrayer
  };

  return (
    <CovenantContext.Provider value={value}>
      {children}
    </CovenantContext.Provider>
  );
};

export const useCovenant = () => {
  const context = useContext(CovenantContext);
  if (context === undefined) {
    throw new Error('useCovenant must be used within a CovenantProvider');
  }
  return context;
};
