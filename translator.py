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

    def detect_source_language(self, text):
        self.source_language = self.translator.detect(text)[1]

    def set_stop_words(self):
        self.stop_words = set(stopwords.words(self.source_language))

    def tokenize_text(self):
        return word_tokenize(self.text)

    def parse_words_alpha(self, tokenized_text):
        return [word.lower() for word in tokenized_text if word.isalpha()]

    def get_source_and_target(self,):
        if self.source_language == 'turkish':
            return ['tr', 'en']
        else:
            return ['en', 'tr']

    def translate(self, words):
        if self.source_language == 'turkish':
            self.target_language = 'en'
        else:
            self.target_language = 'tr'
        ordered_words = set()
        terminology = {}
        for src_word in words:
            if src_word not in self.stop_words and src_word not in ordered_words:
                ordered_words.add(src_word)
                tgt_word = self.translator.translate(
                    src_word, lang_src=self.source_language, lang_tgt=self.target_language)
                terminology[src_word] = tgt_word
        return terminology
