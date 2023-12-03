import itertools
import pathlib
import re

import httpx

NOUNS_URL = "https://www.talkenglish.com/vocabulary/top-1500-nouns.aspx"
VERBS_URL = "https://www.talkenglish.com/vocabulary/top-1000-verbs.aspx"

def get_page_text(url: str):
    res = httpx.get(url)
    res.raise_for_status()
    return res.text


def get_words_from_page(text: str):
    words = re.findall(r"/how-to-use/(\w+)", text)
    return itertools.chain(words)


def main():
    nouns = tuple(get_words_from_page(get_page_text(NOUNS_URL)))
    verbs = tuple(get_words_from_page(get_page_text(VERBS_URL)))
    words = sorted(set(nouns + verbs))
    file = pathlib.Path("../data/words.txt")
    file.write_text("\n".join(words))    


if __name__ == "__main__":
    main()