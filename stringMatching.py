import re
import unicodedata


def removeLang(query):
    """
    remove string specified in the list from the input
    """
    stopwords = [
        "assamese", "bengali", "gujarati", "hindi", "kannada", "kashmiri",
        "konkani", "malayalam", "manipuri", "marathi", "nepali", "odia",
        "punjabi", "sanskrit", "sindhi", "urdu", "tamil", "telugu", "bodo",
        "dogri", "maithili", "santali"
    ]

    querywords = query.split()

    resultwords = [
        word for word in querywords if word.lower() not in stopwords
    ]
    result = ' '.join(resultwords)

    return str(result)


def strip_accents(text):
    """
    Strip accents from input String.
    """
    try:
        text = str(text, 'utf-8')
    except (TypeError, NameError): # unicode is a default on python 3 
        pass
    text = unicodedata.normalize('NFD', text)
    text = text.encode('ascii', 'ignore')
    text = text.decode("utf-8")
    return str(text)

# remove all symbols from string and join together
def compareRegex(movie):
    movie = re.sub(r'\(U\)|\(U/A\)', '', movie) #remove (U) from film title
    movie = re.sub(r'[^\w]', ' ', movie)# removes symbols from string
    movie = re.sub(r'([a-z])\1+', r'\1', movie) # remove adjacent repeating letters and replaces with single letter
    movie = re.sub(r'(\s)\1+', r'\1', movie) # removes adjacent repeating spaces and replaces with single space
    return movie


#normalizes accented character to english and then regex strips down repeating letters.
def stripDown(string):
    out = compareRegex(strip_accents(string))
    return removeLang(out)