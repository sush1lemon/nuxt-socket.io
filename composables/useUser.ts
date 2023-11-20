import crypto from "crypto";
import {useLocalStorage, useStorage} from "@vueuse/core";

export default function () {
    let user = useStorage('ncs-user', {id: getCrypto().randomUUID(), name: null});
    return { user }
}
function getCrypto() {
  try {
    return window.crypto;
  } catch {
    return crypto;
  }
}
