import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MyContentProps {
    id: string;
    slug: string;
    api: Function;
}

export function useMyContentHook(props: MyContentProps[], initData) {
    const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
    const navigate = useNavigate();
    const [data, setData] = useState(initData);

    useEffect(() => {
        if (selectedIndex === null) {
            return;
        }
        if (!props.hasOwnProperty(selectedIndex)) {
            navigate("/404");
        } else {
            const { slug, api } = props[selectedIndex];
            navigate(`/mycontent/${slug}`);
            if (data[slug].length === 0)
                api().then((response) => {
                    setData((prevData) => ({ ...prevData, [slug]: response }));
                });
        }
    }, [selectedIndex]);

    useEffect(() => {
        const slug = document.location.pathname.split("/mycontent/")[1];
        const id = Object.keys(props).find((key) => props[key].slug === slug);
        setSelectedIndex(id);
    }, []);

    return [selectedIndex, setSelectedIndex, data];
}
