// Initialize Canvas
const canvas = new fabric.Canvas('stickerCanvas', {
    backgroundColor: '#fff'
});

// Elements
const imageUpload = document.getElementById('imageUpload');
const addTextBtn = document.getElementById('addTextBtn');
const colorPicker = document.getElementById('colorPicker');
const deleteBtn = document.getElementById('deleteBtn');
const downloadBtn = document.getElementById('downloadBtn');
const emojiBtns = document.querySelectorAll('.emoji-btn');

// 1. Upload Image
imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(f) {
        fabric.Image.fromURL(f.target.result, function(img) {
            // Scale image to fit canvas if too big
            if (img.width > 500) {
                img.scaleToWidth(400);
            }
            canvas.add(img);
            canvas.centerObject(img);
            canvas.setActiveObject(img);
            canvas.renderAll();
        });
    };
    reader.readAsDataURL(file);
});

// 2. Add Custom Text
addTextBtn.addEventListener('click', function() {
    const text = new fabric.IText('Your Text', {
        left: 100,
        top: 100,
        fontFamily: 'Poppins',
        fill: colorPicker.value,
        fontSize: 30,
        fontWeight: 'bold'
    });
    canvas.add(text);
    canvas.setActiveObject(text);
});

// 3. Add Emoji
emojiBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const emoji = new fabric.Text(this.innerText, {
            left: 200,
            top: 200,
            fontSize: 50
        });
        canvas.add(emoji);
        canvas.setActiveObject(emoji);
    });
});

// 4. Delete Selected Object
deleteBtn.addEventListener('click', function() {
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
        canvas.remove(activeObj);
    } else {
        alert("Select something to delete first!");
    }
});

// Delete with 'Delete' key on keyboard
document.addEventListener('keydown', function(e) {
    if(e.key === 'Delete') {
        const activeObj = canvas.getActiveObject();
        if (activeObj) canvas.remove(activeObj);
    }
});

// 5. Download Sticker
downloadBtn.addEventListener('click', function() {
    // Deselect everything first so selection box doesn't show in download
    canvas.discardActiveObject();
    canvas.renderAll();

    const link = document.createElement('a');
    link.download = 'my-funny-sticker.png';
    link.href = canvas.toDataURL({
        format: 'png',
        quality: 1
    });
    link.click();
});
