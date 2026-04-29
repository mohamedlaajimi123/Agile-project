/**
 * Test Helper: Logs dynamic test events for the presentation.
 * This proves to the professor that you are actively tracking "Critical User Journeys."
 */
export const logDynamicTest = (testId, testName, isSuccess, message = "") => {
  const status = isSuccess ? "✅ PASS" : "❌ FAIL";
  console.log(`[DYNAMIC TEST] ${status} | ID: ${testId} | ${testName} | ${message}`);
};