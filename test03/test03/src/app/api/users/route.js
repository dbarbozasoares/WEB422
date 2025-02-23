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
// this in memory array is accessible as variable and on this case, it doesnt require a format of the object
// the search and insertion time should be faster than accessing any db, but also overloads the memory if we have a big set of data
// the problem is any new user added will be deleted if server turn off and also if we make any change on the code
export let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

export async function GET() {
  return Response.json(users, { status: 200 });
}

export async function POST(req) {
  try {
    const { name } = await req.json(); // require only name since id is based on array length

    if (!name) {
      return Response.json({ error: "Name is required" }, { status: 400 }); // if name is not provided, return error
    }

    const newUser = { id: users.length + 1, name }; // makes sure updates id based on array length
    users.push(newUser); // insert new user into our array

    return Response.json(newUser, { status: 200 }); // return new user created and status 200 success
  } catch (error) {
    return Response.json({ error: "Invalid request" }, { status: 400 }); // if there is any error, return status 400 and json message
  }
}
