import xlsxwriter


class Excel:
    def __init__(self, filename):
        self.filename = filename
        self.workbook = xlsxwriter.Workbook(
            f'./excel_files/{self.filename.lower()}.xlsx')
        self.worksheet = self.workbook.add_worksheet("terminology")

    def write_worksheet(self, words, source_language, target_language):
        self.worksheet.write(0, 0, source_language)
        self.worksheet.write(0, 1, target_language)
        row = 1
        col = 0
        for src, trg in words.items():
            if type(src) is list:
                self.worksheet.write(row, col, src[0])
            else:
                self.worksheet.write(row, col, src)
            if type(trg) is list:
                self.worksheet.write(row, col + 1, trg[0])
            else:
                self.worksheet.write(row, col + 1, trg)
            row += 1

    def close_workbook(self):
        self.workbook.close()
