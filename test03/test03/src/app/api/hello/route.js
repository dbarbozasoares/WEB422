/********************************************************************************
 * WEB422 – Test 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Diego B Soares Student ID: ____145820239____ Date: __feb - 22 - 2025_______
 * Published URL: _________________https://github.com/dbarbozasoares/WEB422__________________________________________
 ********************************************************************************/
// Basically from this api we can make sure our api route is working
// Since this api response doesnt search in any db and just returns a message
export async function GET() {
  return Response.json(
    { message: "Hello, welcome to our API!" },
    { status: 200 }
  );
}
