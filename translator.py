import nltk

from google_trans_new import google_translator
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

nltk.download('stopwords')
nltk.download('punkt')


class Translator():
    def __init__(self, text):
        self.text = text
        self.translator = google_translator()

    def set_stop_words(self, source_language):
        self.stop_words = set(stopwords.words(source_language))

    def tokenize_text(self):
        return word_tokenize(self.text)

    def parse_words_alpha(self, tokenized_text):
        return [word.lower() for word in tokenized_text if word.isalpha()]

    def translate(self, words, source_language, target_language):
        ordered_words = set()
        terminology = {}
        for src_word in words:
            if src_word not in self.stop_words and src_word not in ordered_words:
                ordered_words.add(src_word)
                tgt_word = self.translator.translate(
                    src_word, lang_src=source_language, lang_tgt=target_language)
                terminology[src_word] = tgt_word
        return terminology
