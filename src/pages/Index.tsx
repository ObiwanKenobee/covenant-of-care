
import React from 'react';
import { CovenantProvider } from '../contexts/CovenantContext';
import SacredPrompt from '../components/SacredPrompt';
import CovenantDashboard from '../components/CovenantDashboard';
import EthicsAuditTrail from '../components/EthicsAuditTrail';

const Index = () => {
  return (
    <CovenantProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Sacred Prompt Header */}
          <div className="max-w-4xl mx-auto">
            <SacredPrompt />
          </div>

          {/* Main Dashboard */}
          <div className="max-w-7xl mx-auto">
            <CovenantDashboard />
          </div>

          {/* Ethics Audit Trail */}
          <div className="max-w-4xl mx-auto">
            <EthicsAuditTrail />
          </div>

          {/* Footer Covenant */}
          <div className="max-w-4xl mx-auto text-center py-8">
            <blockquote className="text-lg italic text-muted-foreground border-l-4 border-amber-400 pl-6 my-8">
              "Technology is not the throne. It is the footstool."
            </blockquote>
            <p className="text-sm text-muted-foreground">
              Built to bow to the wisdom of deserts, the memory of kingdoms, 
              the pulse of prayer, and the covenant of care.
            </p>
          </div>
        </div>
      </div>
    </CovenantProvider>
  );
};

export default Index;
