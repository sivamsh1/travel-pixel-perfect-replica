
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import PlansHeader from '@/components/plans/PlansHeader';
import PlanFilters from '@/components/PlanFilters';
import PlansList from '@/components/plans/PlansList';
import PlanComparisonManager from '@/components/plans/PlanComparisonManager';
import ConnectionWarning from '@/components/plans/ConnectionWarning';
import { useInsuranceQuotes } from '@/hooks/useInsuranceQuotes';
import { useTravelForm } from '@/context/TravelFormContext';
import { useDateFormatter } from '@/components/plans/useDateFormatter';
import { usePlansFilter } from '@/components/plans/usePlansFilter';
import { useBuyNowHandler } from '@/components/plans/useBuyNowHandler';
import { socketService } from '@/services/socketService';

const PlansStep = () => {
  const { travellersCount } = useTravelForm();
  const { quotes, isLoading, isConnected, receivedFirstBatch, socketResponses } = useInsuranceQuotes();
  const { formattedStartDate, formattedEndDate } = useDateFormatter();
  
  const {
    selectedInsurer,
    setSelectedInsurer,
    selectedPriceSort,
    setSelectedPriceSort,
    selectedCoverage,
    setSelectedCoverage,
    isAnyFilterActive,
    handleResetFilters,
    filteredQuotes
  } = usePlansFilter(quotes);
  
  const { handleBuyNow } = useBuyNowHandler();
  
  // Advanced debugging - log socket connection status
  useEffect(() => {
    console.log('🔌 Socket connected status:', isConnected);
    console.log('📡 Socket service status:', socketService.getConnectionStatus());
  }, [isConnected]);
  
  // Log socket responses whenever they change
  useEffect(() => {
    if (socketResponses && socketResponses.length > 0) {
      console.log("🔄 All socket responses count:", socketResponses.length);
      console.log("📤 Latest socket response:", JSON.stringify(socketResponses[socketResponses.length - 1], null, 2));
      
      // Log each type of response format we might be receiving
      const lastResponse = socketResponses[socketResponses.length - 1];
      console.log("📊 Response type check:");
      
      if (Array.isArray(lastResponse)) {
        console.log("✅ Is array:", true);
        console.log("📏 Array length:", lastResponse.length);
        if (lastResponse.length > 0) {
          console.log("🔑 First element:", lastResponse[0]);
          if (typeof lastResponse[0] === 'object' && lastResponse[0] !== null) {
            console.log("🔍 First element data keys:", Object.keys(lastResponse[0]));
            if ('data' in lastResponse[0]) {
              console.log("🔍 Sample data keys:", Object.keys(lastResponse[0].data).slice(0, 5));
            }
          }
        }
      } else {
        console.log("❌ Is array:", false);
        console.log("🔍 Object type:", typeof lastResponse);
        if (typeof lastResponse === 'object' && lastResponse !== null) {
          console.log("🔑 Object keys:", Object.keys(lastResponse));
        }
      }
    } else {
      console.log("❌ No socket responses received yet");
    }
  }, [socketResponses]);
  
  // Log quotes whenever they change
  useEffect(() => {
    console.log("📋 Current quotes count:", quotes.length);
    console.log("🔍 Filtered quotes count:", filteredQuotes.length);
    if (quotes.length > 0) {
      console.log("📝 Sample quote:", quotes[0]);
    } else {
      console.log("❌ No quotes available");
    }
  }, [quotes, filteredQuotes]);
  
  return (
    <Layout>
      <PlansHeader />
      
      <div className="flex flex-1 flex-col items-center px-6 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Select Your Plan</h2>
        
        <ConnectionWarning isConnected={isConnected} isLoading={isLoading} />
        
        <PlanFilters 
          travellersCount={travellersCount}
          formattedStartDate={formattedStartDate}
          formattedEndDate={formattedEndDate}
          selectedInsurer={selectedInsurer}
          selectedPriceSort={selectedPriceSort}
          selectedCoverage={selectedCoverage}
          onInsurerChange={setSelectedInsurer}
          onPriceSortChange={setSelectedPriceSort}
          onCoverageChange={setSelectedCoverage}
          onResetFilters={handleResetFilters}
          filteredPlansCount={filteredQuotes.length}
          isAnyFilterActive={isAnyFilterActive}
        />
        
        <PlanComparisonManager>
          {({ isSelectedForComparison, togglePlanComparison }) => (
            <PlansList
              apiQuotes={filteredQuotes}
              travellersCount={travellersCount}
              onBuyNow={(planName) => handleBuyNow(planName, quotes)}
              isSelectedForComparison={isSelectedForComparison}
              onToggleCompare={togglePlanComparison}
              isLoading={isLoading}
              isConnected={isConnected}
              receivedFirstBatch={receivedFirstBatch}
            />
          )}
        </PlanComparisonManager>

        {/* Debug Information - Enhanced for Better Troubleshooting */}
        <div className="mt-8 p-4 border border-gray-300 rounded-md w-full">
          <h3 className="font-bold">Debug Information:</h3>
          <p>Socket Connected: {isConnected ? 'Yes' : 'No'}</p>
          <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
          <p>Received First Batch: {receivedFirstBatch ? 'Yes' : 'No'}</p>
          <p>Total Quotes: {quotes.length}</p>
          <p>Filtered Quotes: {filteredQuotes.length}</p>
          <p>Socket Responses: {socketResponses?.length || 0}</p>
          
          {quotes.length > 0 && (
            <div className="mt-2">
              <h4 className="font-semibold">Available Insurance Companies:</h4>
              <ul className="text-xs ml-4 list-disc">
                {Array.from(new Set(quotes.map(q => q.provider))).map(
                  (provider, idx) => <li key={idx}>{provider}</li>
                )}
              </ul>
            </div>
          )}
          
          {socketResponses && socketResponses.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Latest Socket Response Structure:</h4>
              <pre className="text-xs bg-gray-100 p-2 mt-1 overflow-x-auto max-h-40 overflow-y-auto">
                {typeof socketResponses[socketResponses.length - 1] === 'object' 
                  ? JSON.stringify(
                      Array.isArray(socketResponses[socketResponses.length - 1]) 
                        ? { 
                            type: 'array', 
                            length: socketResponses[socketResponses.length - 1].length,
                            sample: socketResponses[socketResponses.length - 1][0]?.data 
                              ? 'Has data property' 
                              : 'No data property'
                          } 
                        : { 
                            type: 'object',
                            keys: Object.keys(socketResponses[socketResponses.length - 1])
                          }, 
                      null, 2
                    )
                  : 'Non-object response'
                }
              </pre>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PlansStep;
