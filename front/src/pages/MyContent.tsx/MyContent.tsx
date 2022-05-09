import { Tab } from "@headlessui/react";
import { apiProvider } from "../../providers/ApiProvider";
import MyComments from "./MyComments";
import MyFavorites from "./MyFavorites";
import MyPosts from "./MyPosts";
import { useMyContentHook } from "./useMyContentHook";

const MyContent = () => {
    const [selectedIndex, setSelectedIndex, data] = useMyContentHook(
        [
            {
                id: "0",
                slug: "posts",
                api: apiProvider.getMyPosts,
            },
            {
                id: "1",
                slug: "comments",
                api: apiProvider.getMyComments,
            },
            {
                id: "2",
                slug: "favorites",
                api: apiProvider.getFavorites,
            },
        ],
        { posts: [], comments: [], favorites: [] }
    );

    return (
        <Tab.Group
            selectedIndex={+selectedIndex}
            onChange={(index) => setSelectedIndex(index.toString())}
        >
            <Tab.List className="flex flex-wrap gap-2 mb-3">
                <Tab className="flex-grow btn white min-w-fit px-4">
                    Publications
                </Tab>
                <Tab className="flex-grow btn white min-w-fit px-4">
                    Commentaires
                </Tab>
                <Tab className="flex-grow btn white min-w-fit px-4">
                    Favoris
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>{<MyPosts posts={data.posts} />}</Tab.Panel>
                <Tab.Panel>{<MyComments comments={data.comments} />}</Tab.Panel>
                <Tab.Panel>{<MyFavorites posts={data.favorites} />}</Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};
export default MyContent;
