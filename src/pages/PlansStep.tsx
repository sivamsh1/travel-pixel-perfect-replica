
import React, { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import PlansHeader from '@/components/plans/PlansHeader';
import PlanFilters from '@/components/PlanFilters';
import PlansList from '@/components/plans/PlansList';
import LoadingPlans from '@/components/plans/LoadingPlans';
import PlanComparisonManager from '@/components/plans/PlanComparisonManager';
import ConnectionWarning from '@/components/plans/ConnectionWarning';
import { useInsuranceQuotes } from '@/hooks/useInsuranceQuotes';
import { useTravelForm } from '@/context/TravelFormContext';
import { useDateFormatter } from '@/components/plans/useDateFormatter';
import { usePlansFilter } from '@/components/plans/usePlansFilter';
import { useBuyNowHandler } from '@/components/plans/useBuyNowHandler';
import { socketService } from '@/services/socketService';

const PlansStep = () => {
  const {
    travellersCount
  } = useTravelForm();
  const {
    quotes,
    isLoading,
    isConnected,
    receivedFirstBatch,
    socketResponses
  } = useInsuranceQuotes();
  const {
    formattedStartDate,
    formattedEndDate
  } = useDateFormatter();
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
  const {
    handleBuyNow
  } = useBuyNowHandler();

  // Auto-scroll functionality with improved scrolling behavior
  const autoScrollRef = useRef({
    scrollInterval: null as NodeJS.Timeout | null,
    userInteracted: false,
    scrollSpeed: 1, // Default scroll speed (pixels per interval)
    maxScrollSpeed: 2 // Maximum scroll speed
  });
  
  useEffect(() => {
    // Start auto-scrolling when component mounts with smooth acceleration
    let currentSpeed = 0.5; // Start with a slower speed
    
    autoScrollRef.current.scrollInterval = setInterval(() => {
      if (!autoScrollRef.current.userInteracted) {
        // Gradually increase scrolling speed up to maxScrollSpeed
        if (currentSpeed < autoScrollRef.current.maxScrollSpeed) {
          currentSpeed += 0.1;
        }
        
        window.scrollBy({
          top: currentSpeed,
          behavior: 'auto' // Using 'auto' for smoother continuous scrolling
        });
      }
    }, 20);

    // Add event listeners to detect user interaction
    const handleUserInteraction = () => {
      if (autoScrollRef.current.scrollInterval) {
        clearInterval(autoScrollRef.current.scrollInterval);
        autoScrollRef.current.userInteracted = true;
        console.log('User interaction detected, auto-scroll stopped');
      }
    };

    // Listen for mouse movement, clicks, scroll, and keyboard events
    document.addEventListener('mousemove', handleUserInteraction);
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    return () => {
      // Clean up on component unmount
      if (autoScrollRef.current.scrollInterval) {
        clearInterval(autoScrollRef.current.scrollInterval);
      }
      document.removeEventListener('mousemove', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

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
    } else {
      console.log("❌ No socket responses received yet");
    }
  }, [socketResponses]);

  // Log quotes whenever they change
  useEffect(() => {
    console.log("📋 Current quotes count:", quotes.length);
    console.log("🔍 Filtered quotes count:", filteredQuotes.length);
  }, [quotes, filteredQuotes]);

  // Determine if we should show loading state
  const showLoading = isLoading && filteredQuotes.length === 0;

  // Determine if we should show connection warning
  const showConnectionWarning = !isConnected || isLoading && isConnected;

  // Status text for plans count
  const plansFoundText = isLoading || filteredQuotes.length === 0 ? "Fetching quotes..." : `${filteredQuotes.length} ${filteredQuotes.length === 1 ? "Plan" : "Plans"} Found`;
  return <Layout>
      <PlansHeader />
      
      <div className="flex flex-1 flex-col items-center px-6 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Select Your Plan</h2>
        
        {showConnectionWarning && <ConnectionWarning isConnected={isConnected} isLoading={isLoading} />}
        
        <PlanFilters travellersCount={travellersCount} formattedStartDate={formattedStartDate} formattedEndDate={formattedEndDate} selectedInsurer={selectedInsurer} selectedPriceSort={selectedPriceSort} selectedCoverage={selectedCoverage} onInsurerChange={setSelectedInsurer} onPriceSortChange={setSelectedPriceSort} onCoverageChange={setSelectedCoverage} onResetFilters={handleResetFilters} filteredPlansCount={filteredQuotes.length} isAnyFilterActive={isAnyFilterActive} />
        
        {/* Display the plans found text */}
        <div className="w-full text-left my-4 font-semibold text-lg py-[4px]">
          {plansFoundText}
        </div>
        
        {showLoading ? <LoadingPlans isConnected={isConnected} message="We're searching for the best insurance plans for your journey. This may take a few moments." /> : <PlanComparisonManager>
            {({
          isSelectedForComparison,
          togglePlanComparison
        }) => <PlansList apiQuotes={filteredQuotes} travellersCount={travellersCount} onBuyNow={planName => handleBuyNow(planName, quotes)} isSelectedForComparison={isSelectedForComparison} onToggleCompare={togglePlanComparison} isLoading={isLoading} isConnected={isConnected} receivedFirstBatch={receivedFirstBatch} />}
          </PlanComparisonManager>}

        {/* Debug Information - Only show in development */}
        {process.env.NODE_ENV === 'development'}
      </div>
    </Layout>;
};

export default PlansStep;
