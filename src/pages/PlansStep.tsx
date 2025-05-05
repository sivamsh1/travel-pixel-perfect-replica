
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
  
  // Log socket responses whenever they change
  useEffect(() => {
    if (socketResponses && socketResponses.length > 0) {
      console.log("All socket responses:", socketResponses);
      console.log("Latest socket response:", socketResponses[socketResponses.length - 1]);
    }
  }, [socketResponses]);
  
  // Log quotes whenever they change
  useEffect(() => {
    console.log("Current quotes count:", quotes.length);
    console.log("Filtered quotes count:", filteredQuotes.length);
    if (quotes.length > 0) {
      console.log("Sample quote:", quotes[0]);
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

        {/* Debug Information - Hidden in Production */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="mt-8 p-4 border border-gray-300 rounded-md w-full">
            <h3 className="font-bold">Debug Information:</h3>
            <p>Socket Connected: {isConnected ? 'Yes' : 'No'}</p>
            <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
            <p>Received First Batch: {receivedFirstBatch ? 'Yes' : 'No'}</p>
            <p>Total Quotes: {quotes.length}</p>
            <p>Filtered Quotes: {filteredQuotes.length}</p>
            <p>Socket Responses: {socketResponses?.length || 0}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PlansStep;
