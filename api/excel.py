import xlsxwriter


class Excel:
    def __init__(self, filename):
        self.filename = filename
        self.workbook = xlsxwriter.Workbook(self.filename)
        self.worksheet = workbook.add_worksheet("terminology")

    def write_worksheet(self, words):
        self.worksheet.write(0, 0, 'source_language')
        self.worksheet.write(0, 1, 'target_language')
        row = 1
        col = 0
        for src, trg in words.items():
            self.worksheet.write(row, col, src)
            self.worksheet.write(row, col + 1, trg)
            row += 1

    def close_workbook(self):
        self.workbook.close()
