import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from excel import Excel
from translator import Translator

UPLOAD_FOLDER = './text_files'
DOWNLOAD_FOLDER = './excel_files'
ALLOWED_EXTENSIONS = {'txt'}

app = Flask(__name__, static_folder='../build', static_url_path='/')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/', methods=["POST"])
def create_terminology():
    if 'file' not in request.files:
        code = 400
        msg = "file not in request"
        return code, msg

    file = request.files['file']

    if file.filename == '':
        code = 400
        msg = "file name empty"
        return code, msg

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        text = open(os.path.join(
            app.config['UPLOAD_FOLDER'], filename), 'r').read()

        if len(text) == 0:
            code = 400
            msg = "File is empty, please provide a valid '.txt' file."
            return code, msg
        else:
            translator = Translator(text)
            translator.set_stop_words('english')
            tokenized_text = translator.tokenize_text()
            words = translator.parse_words_alpha(tokenized_text)
            terms = translator.translate(words, 'en', 'tr')
            terminology_excel = Excel(os.path.splitext(filename)[0])
            terminology_excel.write_worksheet(terms)
            terminology_excel.close_workbook()

            response = send_from_directory(
                app.config['DOWNLOAD_FOLDER'], f'{os.path.splitext(filename)[0]}.xlsx', as_attachment=True)

            os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            os.remove(os.path.join(
                app.config['DOWNLOAD_FOLDER'], f'{os.path.splitext(filename)[0]}.xlsx'))

            return response
