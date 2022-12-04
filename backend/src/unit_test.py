import unittest
from database import Database

class DatabaseTest(unittest.TestCase):
    file = "test_data.json"
    def testConstruction(self):
        db = Database()
        self.assertEqual(len(db.data), 0)
        


if __name__ == '__main__':
    unittest.main()
