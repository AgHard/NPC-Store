const db = require("../config/db");

exports.addToCart = async (req, res) => {
  const userId = req.user?.id;
  const { package_id } = req.body;

  // console.log("Add to cart request:");
  // console.log("User ID:", userId);
  // console.log("Package ID:", package_id);

  try {
    if (!userId || !package_id) {
      return res.status(400).json({ message: "Missing user ID or package ID" });
    }

    const [existing] = await db.query(
      "SELECT * FROM cart WHERE user_id = ? AND package_id = ?",
      [userId, package_id]
    );

    if (existing.length > 0) {
      await db.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND package_id = ?",
        [userId, package_id]
      );
    } else {
      await db.query(
        "INSERT INTO cart (user_id, package_id, quantity) VALUES (?, ?, 1)",
        [userId, package_id]
      );
    }

    res.status(200).json({ message: "Cart updated" });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};


// Get cart by authenticated user
exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const [cartItems] = await db.query(
      `SELECT 
         c.id AS cart_id, c.quantity, 
         gp.id AS package_id, gp.amount, gp.currency, gp.price_egp, gp.description_of_package, gp.image_url 
       FROM cart c 
       JOIN game_packages gp ON c.package_id = gp.id 
       WHERE c.user_id = ?`,
      [userId]
    );

    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Failed to fetch cart", error: err });
  }
};


// Update quantity
exports.updateQuantity = async (req, res) => {
  const userId = req.user.id;
  const { package_id, quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    await db.query(
      "UPDATE cart SET quantity = ? WHERE user_id = ? AND package_id = ?",
      [quantity, userId, package_id]
    );

    res.status(200).json({ message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating quantity", error: err });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { packageId } = req.params;

  try {
    await db.query(
      "DELETE FROM cart WHERE user_id = ? AND package_id = ?",
      [userId, packageId]
    );

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Error removing item", error: err });
  }
};

// Clear cart
exports.clearCart = (req, res) => {
  const userId = req.user.id;

  db.query("DELETE FROM cart WHERE user_id = ?", [userId], (err) => {
    if (err) return res.status(500).json({ message: "Error clearing cart", err });
    res.json({ message: "Cart cleared" });
  });
};
