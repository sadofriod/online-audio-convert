export const option = {

    // Make gradient line here
    visualMap: {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
    },

    title: {
        left: 'center',
        text: '音频转换量统计'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        data: []
    },
    yAxis: {
        splitLine: {show: false}
    },
    series: {
        type: 'line',
        showSymbol: false,
        data: []
    }
};