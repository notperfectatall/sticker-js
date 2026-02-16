// Initialize Canvas
const canvas = new fabric.Canvas('stickerCanvas', {
    backgroundColor: '#ffffff'
});

// Elements
const imageUpload = document.getElementById('imageUpload');
const addTextBtn = document.getElementById('addTextBtn');
const colorPicker = document.getElementById('colorPicker');
const fontSelect = document.getElementById('fontSelect');
const deleteBtn = document.getElementById('deleteBtn');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');
const emojiBtns = document.querySelectorAll('.emoji-btn');

// 1. Upload Image
imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(f) {
        fabric.Image.fromURL(f.target.result, function(img) {
            // Scale to fit canvas
            const scale = Math.min(500 / img.width, 500 / img.height);
            img.scale(scale);
            
            canvas.add(img);
            canvas.centerObject(img);
            canvas.setActiveObject(img);
            canvas.renderAll();
        });
    };
    reader.readAsDataURL(file);
});

// 2. Add Text
addTextBtn.addEventListener('click', function() {
    const text = new fabric.IText('Type here...', {
        left: 100,
        top: 100,
        fontFamily: fontSelect.value,
        fill: colorPicker.value,
        fontSize: 35,
        fontWeight: '600',
        shadow: 'rgba(0,0,0,0.2) 2px 2px 5px'
    });
    canvas.add(text);
    canvas.setActiveObject(text);
});

// Update text color when changed
colorPicker.addEventListener('input', function() {
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.type === 'i-text') {
        activeObj.set('fill', this.value);
        canvas.renderAll();
    }
});

// Update font when changed
fontSelect.addEventListener('change', function() {
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.type === 'i-text') {
        activeObj.set('fontFamily', this.value);
        canvas.renderAll();
    }
});

// 3. Add Emojis
emojiBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const emoji = new fabric.Text(this.innerText, {
            left: 250,
            top: 250,
            fontSize: 60,
            shadow: 'rgba(0,0,0,0.1) 2px 2px 8px'
        });
        canvas.add(emoji);
        canvas.setActiveObject(emoji);
    });
});

// 4. Delete Selected
deleteBtn.addEventListener('click', function() {
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
        canvas.remove(activeObj);
    } else {
        alert('⚠️ Please select something to delete!');
    }
});

// Delete with keyboard
document.addEventListener('keydown', function(e) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
        const activeObj = canvas.getActiveObject();
        if (activeObj) canvas.remove(activeObj);
    }
});

// 5. Clear Canvas
clearBtn.addEventListener('click', function() {
    if (confirm('🗑️ Clear everything? This cannot be undone!')) {
        canvas.clear();
        canvas.backgroundColor = '#ffffff';
        canvas.renderAll();
    }
});

// 6. Download Sticker
downloadBtn.addEventListener('click', function() {
    canvas.discardActiveObject();
    canvas.renderAll();

    const link = document.createElement('a');
    link.download = `aesthetic-sticker-${Date.now()}.png`;
    link.href = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2 // Higher resolution
    });
    link.click();
});
