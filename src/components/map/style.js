export const mapStyles = {
    width: '100%',
    height: '90%',
    position: "fixed",
    bottom: '0'
}

// https://stackoverflow.com/questions/3110020/google-maps-api-v3-no-labels

export const mapNoLabels = (mapProps, map) => {
    const options = [
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },
    ];
    map.set('styles', options);
}