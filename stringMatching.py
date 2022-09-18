import re
import unicodedata


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
    movie = re.sub(r'([a-z])\1+', r'\1', movie) # remove adjacent repeating letters
    return movie


#normalizes accented character to english and then regex strips down repeating letters.
def stripDown(string):
    out = compareRegex(strip_accents(string))
    return str(out)