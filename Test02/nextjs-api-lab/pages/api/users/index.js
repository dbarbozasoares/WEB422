import { UserModel, mongooseConnect } from "@/lib/dbUtils";

export default async function handler(req, res) {
  const { name, id } = req.body;
  const { method } = req;

  try {
    await mongooseConnect();

    switch (method) {
      case "GET":
        let users = await UserModel.find().exec();
        res.status(200).json(users);
        break;
      case "POST":
        const isValid = await validateId(id);
        console.log(isValid);
        if (isValid) {
          const newUser = new UserModel({ name, id });
          await newUser.save();
          res.status(200).json({ message: `User: (ID ${id}) ${name} Created` });
        } else {
          res.status(400).json({ message: `User ${id} already exists` });
        }
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  async function validateId(id) {
    const checker = await UserModel.findOne({ id: id });
    return checker === null;
  }
}
