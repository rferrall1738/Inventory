import { GoogleMap, LoadScriptNext, Marker} from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '150px', // Small map height
};

const SmallMap = ({ lat, lng }) => {
    const center = { lat, lng };

    return (
        <LoadScriptNext googleMapsApiKey="AIzaSyDBMJyGYH7GNDXSJmdzO-kg7-iMHtzJFbE">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScriptNext>
    );
};
export default SmallMap;