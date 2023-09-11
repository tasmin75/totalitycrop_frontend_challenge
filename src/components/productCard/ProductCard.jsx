import React from "react";
import { motion } from "framer-motion";
import style from "./ProductCard.module.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/userSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  console.log("my item", item);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
        quantity: 1,
        category: item.category,
        brand: item.brand,
        description: item.description,
        rating: item.rating,
      })
    );

    toast.success("Item added successfully!");
  };

  return (
    <>
      <div className={style.ProductCard}>
        <motion.img
          src={item.thumbnail}
          alt="image"
          whileHover={{ scale: 0.9 }}
        />

        <div className={style.card_details}>
          <h3>{item.title}</h3>
          <h5>
            {item.category}({item.brand})
          </h5>
          <p>{item.description}</p>
        </div>
        <div className={style.price}>
          <span>₹{item.price}/-</span>
          <motion.button
            className={style.cart_btn}
            whileTap={{ scale: 1.1 }}
            onClick={handleAddToCart}
          >
            Add +
          </motion.button>
          <button variant="outlined" onClick={handleClickOpen} className={style.cart_btn}>
            View Details
          </button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Product Details
        </DialogTitle>
        <DialogContent>
          {item && (
            <DialogContentText>
              <div className={style.dialog}>
                <div className={style.imageContainer}>
                  {item.images.map((image, index) => (
                    <div className={style.image} key={index}>
                      <motion.img
                        src={image}
                        alt="image"
                        whileHover={{ scale: 0.9 }}
                      />
                    </div>
                  ))}
                </div>
                <img className={style.dialog_image} src={item.thumbnail} alt="image" />
                <div className={style.card_details}>
                  <h3>{item.title}</h3>
                  <h5>
                    {item.category}({item.brand})
                  </h5>
                  <p>{item.description}</p>
                </div>
                <div className={style.price}>
                  <span>₹{item.price}/-</span>
                  <motion.button
                    className={style.cart_btn}
                    whileTap={{ scale: 1.1 }}
                    onClick={handleAddToCart}
                  >
                    Add +
                  </motion.button>
                </div>
              </div>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;
