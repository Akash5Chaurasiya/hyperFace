window.onload = function () {
    let container = document.querySelector(".container");
    let btn = document.getElementById("spin");
    let clicks = 0;
    btn.addEventListener("click", spinWheel);
    function spinWheel() {
        clicks += 1;
        if (clicks === 1) {
            let num = Math.ceil(Math.random() * 1000);
            container.style.transform = "rotate(" + num + "deg)";
        }


    }
    document.getElementById("addEntryBtn").addEventListener("click", addEntry);

    function addEntry() {
        const entryInput = document.getElementById('entryInput');
        const entryName = entryInput.value.trim();

        if (entryName !== '') {
            const entryList = document.getElementById('entryList');
            const wheel = document.getElementById('wheel');

            const newEntry = document.createElement('div');
            newEntry.textContent = entryName;
            entryList.appendChild(newEntry);

            const newSeg = document.createElement('div');
            newSeg.textContent = entryName;
            newSeg.style.backgroundColor = getRandomColor();
            adjustNewSegmentPosition(newSeg, entryList.childElementCount);

            wheel.appendChild(newSeg);
            updateWheelRotation();
            entryInput.value = '';
        }
    }

    function updateWheelRotation() {
        const container = document.getElementById('wheel');
        const totalSeg = container.querySelectorAll('.container div').length;
        const angle = 360 / totalSeg;
        const currentRotation = getCurrentRotation(container);
        container.style.transition = 'transform 1s ease-out';
        container.style.transform = `rotate(${currentRotation + angle}deg)`;
    }

    function getCurrentRotation(element) {
        const transformValue = getComputedStyle(element).transform;
        const matrix = new DOMMatrix(transformValue);
        return Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function adjustNewSegmentPosition(seg, count) {
        const totalSeg = 10;
        const angle = 360 / totalSeg;
        const rot = (count - 1) * angle;
        seg.style.transform = `rotate(${rot}deg) translateX(-50%) translateY(-50%)`;
        switch (count % totalSeg) {
            case 1:
                seg.style.backgroundColor = '#3f51b5';
                break;
            case 2:
                seg.style.backgroundColor = '#ff9800';
                seg.style.transform = `rotate(${rot + 45}deg) translateX(-50%) translateY(-50%)`;
                break;
            case 3:
                seg.style.backgroundColor = '#e91e63';
                seg.style.transform = `rotate(${rot + 90}deg) translateX(-50%) translateY(-50%)`;
                break;
        }
    }

}