import {
    Text,
    View,
    StyleSheet,
    Platform,
    FlatList,
    SafeAreaView,
    Image,
    Pressable } from 'react-native';
import { useState } from 'react';
import AdditionalInfo from './AdditionalInfo';
import AdditionalBirdInfo from './AdditionalBirdInfo';


type ItemData = {
    also: any;
    alt: string;
    "animal-seen": string;
    auto: string;
    "bird-seen": string;
    cnt: string;
    date: string;
    dvc: string;
    en: string;
    file: string;
    "file-name": string;
    gen: string;
    group: string;
    id: string;
    lat: string;
    length: string;
    lic: string;
    lng: string;
    loc: string;
    method: string;
    mic: string;
    osci: any;
    q: string;
    rec: string;
    regnr: string;
    rmk: string;
    sex: string;
    smp: string;
    sono: any;
    sp: string;
    ssp: string;
    stage: string;
    temp: string;
    time: string;
    type: string;
    uploaded:string;
    url: string;
};

type ItemProps = {
    item: any;
    backgroundColor: string;
    selectedId: string;
    setSelectedId: () => void;
};

export default function Item({item, setSelectedId, selectedId, backgroundColor }: ItemProps) {

    const [isExpanded, setIsExpanded] =useState(false)
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false)

    const handlePress = (item) => {
        setSelectedId(item.id)
        setIsExpanded((selectedId) => (item.id === selectedId ? null : item.id))
    }

    const onModalClose = () => {
        setIsExpanded(false);
      };

    return (
            <Pressable onPress={() => handlePress(item)} style={[styles.item, {backgroundColor}]}>
                <View>
                <Text style={styles.title}>{`${item.en} - ${item.uploaded}`}</Text>
                </View>
                {isExpanded && <AdditionalBirdInfo onClose={onModalClose} item={item} />}
            </Pressable>
)};

const styles = StyleSheet.create({
    title: {
        textAlign: 'left',
        color: 'black',
        fontSize: 20,
    },
    details: {
        color: 'black',
        fontSize: 14,
    },
    item: {
        width: 350,
        height: 500,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});