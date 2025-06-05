
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EthicsDecision } from '../types/covenant';
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

const EthicsAuditTrail: React.FC = () => {
  const [decisions] = useState<EthicsDecision[]>([
    {
      id: '1',
      action: 'Install solar grid in Wadi Al-Noor',
      timestamp: new Date('2024-06-04T10:30:00'),
      context: 'desert',
      impactAreas: {
        soil: 0.2,
        water: 0.1,
        memory: 0.8,
        trust: 0.9,
        spirit: 0.3
      },
      approved: false,
      overrideAuthority: 'Elder Council of Sinai',
      justification: 'Site contains unmarked ancestral graves. Relocating to adjacent dune.'
    },
    {
      id: '2',
      action: 'Implement transparent taxation interface',
      timestamp: new Date('2024-06-03T14:20:00'),
      context: 'empire',
      impactAreas: {
        soil: 0.0,
        water: 0.0,
        memory: 0.1,
        trust: 0.95,
        spirit: 0.7
      },
      approved: true,
      justification: 'Enhances civic accountability and honors stewardship principles.'
    },
    {
      id: '3',
      action: 'Deploy water monitoring sensors',
      timestamp: new Date('2024-06-02T08:15:00'),
      context: 'desert',
      impactAreas: {
        soil: 0.1,
        water: 0.95,
        memory: 0.2,
        trust: 0.8,
        spirit: 0.6
      },
      approved: true,
      justification: 'Critical for drought preparation and water justice.'
    }
  ]);

  const getStatusIcon = (approved: boolean) => {
    return approved ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    );
  };

  const getImpactColor = (value: number) => {
    if (value > 0.7) return 'bg-green-500';
    if (value > 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getContextBadgeColor = (context: string) => {
    switch (context) {
      case 'desert': return 'bg-amber-100 text-amber-800';
      case 'empire': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6" />
          <span>AEGIS Ethics Audit Trail</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {decisions.map((decision) => (
          <div key={decision.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(decision.approved)}
                  <h3 className="font-semibold">{decision.action}</h3>
                  <Badge className={getContextBadgeColor(decision.context)}>
                    {decision.context}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {decision.justification}
                </p>
                {decision.overrideAuthority && (
                  <p className="text-xs text-orange-600 font-medium">
                    Override Authority: {decision.overrideAuthority}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{decision.timestamp.toLocaleDateString()}</span>
              </div>
            </div>

            {/* Impact Areas */}
            <div className="grid grid-cols-5 gap-2 mt-3">
              {Object.entries(decision.impactAreas).map(([area, value]) => (
                <div key={area} className="text-center">
                  <div className="text-xs text-muted-foreground capitalize mb-1">
                    {area}
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getImpactColor(value)}`}
                        style={{ width: `${value * 100}%` }}
                      />
                    </div>
                    <div className="text-xs mt-1 font-medium">
                      {Math.round(value * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full">
            View Full Audit History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EthicsAuditTrail;
