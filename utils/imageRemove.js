const fs = require("fs");
const path = require("path");

const removeImg = (folder,img) => {
    return new Promise((resolve, reject) => {
      const filePath = path.join('uploads',folder, img);
  
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          reject(err); // Reject the promise if an error occurs
        } else {
          resolve(); // Resolve the promise if the file is deleted successfully
        }
      });
    });
  };

module.exports=removeImg