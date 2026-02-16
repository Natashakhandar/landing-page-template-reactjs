import { submitContact } from "./contacts.js";

export const submitContactHandler = async (req, res) => {
  try {
    const contact = await submitContact(req.body);

    res.status(200).json({
      success: true,
      data: contact,
      message: "Contact submitted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};