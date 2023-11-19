import type {Ref} from "@vue/reactivity";


export default function (elementRef: Ref<HTMLElement>, callback: Function, distance = 0) {

    onMounted(() => {
        elementRef.value.addEventListener("scroll", handleScroll, false);
    });

    onUnmounted(() => {
        if(elementRef.value) {
            elementRef.value.removeEventListener("scroll", handleScroll, false);
        }
    });

    const handleScroll = () => {
        const element = elementRef.value;
        console.log(element.scrollTop);
        // console.log(element.getBoundingClientRect().bottom, element.scrollHeight);
        if (element.scrollTop <  distance) {
            callback();
        }
    };
}
