'''
Funciton: get_data(filename)
    -gets data from file
parameters:
    -filename (str): name of file to get data from
returns:
    -data (list): list of lines from file
    -None: if file not found
'''
def get_data(filename):
    if filename is None:
        return
    try:
        with open(filename, "r", encoding= "utf8") as f:
            data = f.readlines()
        return data
    except:
        print("File not found")
        return None

'''
Function: CeaserFuncGen(key)
    -generates a function that will encode a character by Ceaser cipher along ascii table
parameters:
    -key (int): key to use for encoding
returns:
    -encodingFunc (function): function that will encode a single character
'''
def CeaserFuncGen(key):
    '''
    Function: encodingFunc(char)
        -encodes a single character with Ceaser cipher
    parameters:
        -char (int): character to encode
    returns:
        -char (int): encoded character
    '''
    def encodingFunc(char):
        char = ord(char)
        newchar = char + key
        if newchar > 127 or newchar < 0:
            newchar = newchar % 128
        return chr(newchar)
    return encodingFunc

'''
Function: encode(data, encodingFunc)
    -encodes a list of strings with encodingFunc
parameters:
    -data (list): list of strings to encode
    -encodingFunc (function): function that will encode each character
returns:
    -datain (list): list of encoded strings
'''
def Cipher(data, CipherTransform):
    #encode the list, data\n",
    newdata = []
    for row in data:
        rowin = ""
        for char in row:
            rowin += CipherTransform(char)
        newdata.append(rowin)
    return newdata

'''
Function: write_data(filename, data, mode="d")
    -writes data to file
parameters:
    -filename (str): name of file to write to
    -data (list): list of strings to write to file
    -mode (str): "d" for decode, "e" for encode
returns:
    -None
'''
def write_data(filename, data, mode):
    if mode == "d":
        newname = filename[:-4] + ".dec"
    elif mode == "e":
        if filename[-4:] == ".enc":
            newname = filename
        else:
            newname = filename + ".enc"
    else:
        print("invalid write data mode")
        return
    
    with open(newname, "w", encoding = "utf8") as f:
        for element in data:
            f.write(element)
            

'''
Function: string_to_number(text, n=3)
    -converts a string to a number
parameters:
    -text (str): string to convert
    -n (int): number of digits to use for each character
returns:
    -number (int): number representing the string
'''
def string_to_number(text):
    #l = []
    Sum = 0
    for c in text:
       #l.append('{:0>{}}'.format(ord(c), n))
       Sum += ord(c)
    return Sum
    #return int(''.join(l))

def main(filename = None, key = None):
    #get filename and initilize data
    data = get_data(filename)
    while data is None:
        filename = input("Enter filename: ")
        data = get_data(filename)

    #get choice
    choice = ""
    while (not (choice == "e" or choice == "d")):
        choice = input("Encode or decode? (e/d): ")

    # get key Eaps
    while (key is None or (type(key) is not int)):
        inpt = input("Enter passkey: ")
        try:
            key = int(inpt)
        except:
            key = string_to_number(inpt)

            
    #generate encoding function
    print("\n\nGenerating Transfer function...")
    if choice == "e":
        CipherTransform = CeaserFuncGen(key)
    elif choice == "d":
        CipherTransform = CeaserFuncGen(-key)
    else:
        print("Invalid choice")

    #encode data
    print("Encoding data...")
    data = Cipher(data, CipherTransform)

    #write data
    print("Writing data...")
    write_data(filename, data, choice)
    print(f"You have successfully {'encoded' if choice == 'e' else 'decoded'} {filename} with key {inpt}.\nThe output file is {filename[:-4] + '.dec' if choice == 'd' else filename + '.enc'}\n\n")

if __name__ == "__main__":
    main()


    