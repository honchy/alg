// 基本排序，冒泡排序
function swap(arr, i, j) {
    if (i !== j) {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}

function bubleSort(arr) {
    if (!arr || !arr.length || arr.length < 2) {
        return arr;
    }
    // 比较相邻元素，若是大小倒置，则交换
    // 所以要比较len - 1次全部比较
    let len = arr.length;
    // 时间复杂度： (n - 1) * (n - 1) n^2
    for (let cnt = 0; cnt < len - 1; cnt++) {
        // 排序
        for (let idx = 0; idx < len - 1 - cnt; idx++) {
            if (arr[idx] > arr[idx + 1]) {
                swap(arr, idx, idx + 1);
            }
        }
    }

    return arr;
}

// 冒牌排序提前判断退出循环

function bubleSort2(arr) {
    if (!arr || !arr.length || arr.length < 2) {
        return arr;
    }
    // 比较相邻元素，若是大小倒置，则交换
    // 所以要比较len - 1次全部比较
    let len = arr.length,
        flag = 1;
    // 时间复杂度： (n - 1) * (n - 1) n^2
    for (let cnt = 0; cnt < len - 1; cnt++) {
        // 排序
        for (let idx = 0; idx < len - 1 - cnt; idx++) {
            if (arr[idx] > arr[idx + 1]) {
                swap(arr, idx, idx + 1);
                flag = 0;
            }
        }

        if (flag) {
            break;
        }
    }

    return arr;
}

// 冒泡排序需要挨个比较，加入数组有部分顺序呢？
// 只需要把元素插入已经有序的子序列中即可
function insertSort(arr) {
    if (!arr || !arr.length || arr.length < 2) {
        return arr;
    }
    let len = arr.length;
    // n * n
    for (let i = 1; i < len; i++) {
        let cur = arr[i];
        let j = i;
        while (arr[j] < arr[j - 1] && j >= 1) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = cur;
    }

    return arr;
}

function selectSort(arr) {
    if (!arr || !arr.length || arr.length < 2) {
        return arr;
    }

    let len = arr.length;

    for (let i = 0; i < len; i++) {
        let min = arr[i];
        let pos = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < min) {
                min = arr[j];
                pos = j;
            }
        }
        swap(arr, i, pos);
    }

    return arr;
}

// 优化策略就是，既然自然有序，那么分成若干部分；每部分 insert 排序的算法得到优化，能够最优的概率比较高
function insertSortShell(arr) {
    if (!arr || !arr.length || arr.length < 2) {
        return arr;
    }
    let len = arr.length;
    // gap选取
    for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // 分段
        for (let i = gap; i < len; i += gap) {
            // 插入排序
            let cur = arr[i];
            let j = i;
            while (arr[j] < arr[j - gap] && j >= 1) {
                arr[j] = arr[j - gap]
                j - + gap;
            }
            arr[j] = cur;
        }
    }
    return arr;
}
// 一般用数组来表示堆，下标为 i 的结点的父结点下标为(i-1)/2；其左右子结点分别为 (2i + 1)、(2i + 2)
function heapAdjust(arr, i, len) {
    let p = arr[i];
    for (let k = 2 * i + 1; k < len; k = k * 2 + 1) {
        if (k + 1 < len && arr[k] < arr[k + 1]) {
            k++;
        }
        if (arr[k] > p) {
            arr[i] = arr[k];
            i = k;
        } else {
            break;
        }
    }
    arr[i] = p;
}
function heapSort(arr) {
    if (!arr || !arr.length || arr.length < 2) {
        return arr;
    }

    let len = arr.length;
    // 逐个顶点的遍历处理， 2 * i + 1 <= len
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        heapAdjust(arr, i, len);
    }
    for (let j = len - 1; j > 0; j--) {
        swap(arr, 0, j);
        heapAdjust(arr, 0, j);
    }

    return arr;
}

// 归并排序
function merge(arr, start, mid, end) {
    let ret = [];
    let i = start, j = mid + 1;
    while(i <= mid && j <= end) {
        ret.push(arr[i] < arr[j] ? arr[i ++] : arr[j ++]);
    }
    while(i <= mid) {
        ret.push(arr[i ++]);
    }

    while(j <= end) {
        ret.push(arr[j ++]);
    }

    ret.forEach((item, idx) => {
        arr[start + idx] = item;
    })
}

function mergeSort(arr, start, end) {
    if (!arr || !arr.length || arr.length < 2) {
        return arr;
    }
    
    if(start >= end) {
        return arr;
    }

    let mid = Math.floor((start + end) / 2);

    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);

    merge(arr, start, mid, end);

    return arr;
}


function boundary(arr, start, end) {
    let standard = arr[start];
    let s = start, e = end;
    while(s < e) {
        while(s < e && arr[e] >= standard) {
            e --;
        }
        arr[s] = arr[e];
        while(s < e && arr[s] <= standard) {
            s ++;
        }
        arr[e] = arr[s];
        // if(s < e) {
        //     swap(arr, s, e);
        // }
    }
    arr[s] = standard;
    return s;
}
function quickSort(arr, start, end) {
    if (!arr || !arr.length || arr.length < 2) {
        return arr;
    }
    
    if(start >= end) {
        return arr;
    }

    let boundaryIdx = boundary(arr, start, end);
    quickSort(arr, start, boundaryIdx - 1);
    quickSort(arr, boundaryIdx + 1, end);

    return arr;
}


const arr = [17, 100, 11, -3, -9, 11, 10, 5, 4, 1, 0, -99, 34, 54];

console.log('buble sort:\t\t', bubleSort(arr));
console.log('buble2 sort:\t\t', bubleSort2(arr));
console.log('insert sort:\t\t', insertSort(arr));
console.log('insert shell sort:\t', insertSortShell(arr));
console.log('select sort:\t\t', selectSort(arr));
console.log('heap sort:\t\t', heapSort(arr));
console.log('merge sort:\t\t', mergeSort(arr, 0, arr.length - 1));
console.log('quick sort:\t\t', quickSort(arr, 0, arr.length - 1));
