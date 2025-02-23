// Basically from this api we can make sure our api route is working
// Since this api response doesnt search in any db and just returns a message
export async function GET() {
  return Response.json(
    { message: "Hello, welcome to our API!" },
    { status: 200 }
  );
}
