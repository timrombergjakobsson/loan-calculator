import { useIndustries } from './hooks/useIndustries';
import { useLoanCalculation } from './hooks/useLoanCalculation';
import LoanForm from './components/LoanForm';
import LoanResult from './components/LoanResult';

function App() {
  const { industries, loading: industriesLoading, error: industriesError } = useIndustries();
  const { result, loading: calculating, error: calculationError, calculate, reset } = useLoanCalculation();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Frauda
          </h1>
          <p className="text-gray-900 mb-6">We are legit, we promise</p>

          <div className="bg-gray-200 rounded-lg p-4 mb-8">
            <h2 className="font-bold text-gray-900 mb-1">Loan terms</h2>
            <p className="text-gray-600">Calculate your personalized loan terms</p>
          </div>

          {industriesError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">Error loading industries: {industriesError}</p>
              <p className="text-sm text-red-600 mt-2">
                The form may not work correctly without industry data. Please check your internet connection and try refreshing the page.
              </p>
            </div>
          )}

          {calculationError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">Error calculating loan: {calculationError}</p>
            </div>
          )}

          {!result && (
            <LoanForm
              industries={industries || []}
              industriesLoading={industriesLoading}
              onSubmit={calculate}
              isCalculating={calculating}
            />
          )}

          {result && (
            <>
              <LoanResult result={result} />
              <button
                onClick={reset}
                className="mt-6 w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                Calculate Another Loan
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
