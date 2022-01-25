import MusicList from "../../components/MusicList/MusicList.vue";
import storage from "good-storage";
import { processSongs } from "../../service/song";

export default function createDetailComponent(key, fetch) {
    return {
        props: {
            data: Object,
        },
        components: {
            MusicList,
        },
        data() {
            return {
                songs: [],
                loading: true,
            };
        },
        computed: {
            computedData() {

                let ret = null;
                const data = this.data;
                if (data) {
                    ret = data;
                } else {
                    const cached = storage.session.get(key);
                    if (cached && (cached.mid || cached.id + '')== this.$route.params.id)
                        ret = cached;
                }
                return ret;
            },
            title() {
                const data = this.computedData
                return data && (data.name||data.title)
            },
            pic() {
                const data = this.computedData
                return data && data.pic
            }
        },
        async created() {
            const data = this.computedData
            if (!data) {
                const path = this.$route.matched[0].path
                this.$router.push({
                    path
                })
                return
            }
            let result = await fetch(data);
            this.songs = await processSongs(result.songs);
            this.loading = false;
        },
    }
}