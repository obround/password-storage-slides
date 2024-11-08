"use client";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import CryptoAES from "crypto-js/aes";
import MD5 from "crypto-js/md5";

const tableData = [
    {username: "joejohnson024", password: "iLoveCats1234!"},
    {username: "sunnyday99", password: "ShinySun2024!"},
    {username: "maverick_jay", password: "TopGun#900"},
    {username: "candylover88", password: "SweetLife#2024"},
    {username: "stormrider17", password: "ThunderBolt!12"},
    {username: "skybreeze42", password: "FlyHigh^2024"},
    {username: "codewizard23", password: "MagicCode#23"},
    {username: "nightowl_77", password: "DreamBig!7"},
    {username: "digitalghost", password: "Phantom#99"},
    {username: "eco_warrior", password: "GreenEarth*12"},
    {username: "wonderland19", password: "CuriousCat!9"},
    {username: "techgenius47", password: "CodeMaster#47"},
    {username: "oceanwave34", password: "DeepBlue*42"},
    {username: "mountainpeak8", password: "Summit#900"},
    {username: "galaxydreamer", password: "StarrySky!123"},
    {username: "frozenlake12", password: "IceQueen#77"},
];

function deterministicRandomString(input, length = 10) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = (hash * 31 + input.charCodeAt(i)) & 0xffffffff;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    while (result.length < length) {
        hash = (hash * 31 + 17) & 0xffffffff;
        const index = Math.abs(hash) % chars.length;
        result += chars[index];
    }

    return result;
}


function TitleSlide() {
    return <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="border-2 border-blue-200 p-24 rounded-xl">
            <h1 className="font-bold text-7xl text-center">Secure Password Storage</h1>
            <h2 className="font-semibold text-2xl text-center">by Aditya, Ali, Kushagra, and Sutej</h2>
        </div>
    </div>;
}

function FinalSlide() {
    return <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
        <h1 className="font-bold text-9xl text-center">Thank you</h1>
        <h2 className="font-semibold text-4xl text-center">Any Questions?</h2>
    </div>;
}

function Slide({title, text, table}) {
    return <div className="flex flex-1 pb-6 h-full min-h-0 items-center gap-6">
        <div
            className="flex flex-col gap-2 w-[40%] border rounded-md h-full px-6 py-8 text-neutral-800 leading-relaxed overflow-auto">
            <h1 className="font-bold text-4xl border-b pb-1 mb-1">{title}</h1>
            {text}
        </div>
        <div className="w-[60%] border relative rounded-md h-full overflow-auto">
            {table}
        </div>
    </div>;
}

function Slide2() {
    return <Slide
        title="Introduction"
        text={
            <div>
                <p>What is the best way to store our passwords? To the right is an example database of usernames and
                    passwords.</p>
                <ul className="list-disc list-inside pl-6">
                    <li>
                        However, this is clearly not a secure way to store passwords.
                    </li>
                    <li>
                        If this database were to be leaked, all the passwords would be compromised.
                    </li>
                </ul>
                <p>There must be a better way...</p>
            </div>
        }
        table={
            <Table>
                <TableHeader className="sticky top-0 bg-neutral-50">
                    <TableRow>
                        <TableHead className="w-[150px]">username</TableHead>
                        <TableHead className="w-[150px]">password</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{row.username}</TableCell>
                            <TableCell>{row.password}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        }
    />;
}

function Slide3() {
    const [key, setKey] = useState("test_security_key");
    const encryptedData = tableData.map(row => ({
        username: row.username,
        password: CryptoAES.encrypt(row.password, key).toString(),
    }));
    const onChangeHandler = (event) => {
        setKey(event.target.value);
    };
    return <Slide
        title="Idea #1: Encryption"
        text={
            <div>
                <h3 className="text-2xl font-semibold border-b pb-1 mb-1">What is two-way encryption?</h3>
                <p className="pb-1">Two-way encryption is a method of storing data in a way that can be decrypted back
                    to its original
                    form. We will assume that we are talking about symmetric encryption algorithms. Examples of two-way
                    encryption algorithms include AES, Blowfish, and RC4.
                </p>
                <p>
                    They encrypt string of text using a predetermined
                    "security key" known as a key. The same key is used to decrypt the text back to its original form.
                </p>
                <h3 className="text-2xl font-semibold border-b pt-2 pb-1 mb-1">Try it out!</h3>
                <p>The database table on the right now has its passwords encrypted. You can modify the security key:</p>
                <Input className="my-2" placeholder="Enter your security key here" value={key}
                       onChange={onChangeHandler}/>
                <h3 className="text-2xl font-semibold border-b pt-2 pb-1 mb-1">Evaluation</h3>
                <p>
                    Is this secure? No. If the attacker manages to get access to the security key, they can decrypt
                    every password in the table.
                </p>
            </div>
        }
        table={
            <Table>
                <TableHeader className="sticky top-0 bg-neutral-50">
                    <TableRow>
                        <TableHead className="w-[150px]">username</TableHead>
                        <TableHead className="w-[150px]">aes_encrypted_password</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {encryptedData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{row.username}</TableCell>
                            <TableCell>{row.password}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        }
    />;
}

function Slide4() {
    const [text, setText] = useState("");
    const onChangeHandler = (event) => {
        setText(event.target.value);
    };
    const hashedData = tableData.map(row => ({
        username: row.username,
        password: MD5(row.password).toString(),
    }));
    return <Slide
        title="Idea #2: Hashing"
        text={
            <div>
                <h3 className="text-2xl font-semibold border-b pb-1 mb-1">What is hashing?</h3>
                <p className="pb-1">
                    Hashing is a kind of one-way encryption. It is a method of storing data in a way that cannot be
                    decrypted. So then what is the point of hashing passwords?
                </p>
                <p>
                    After signing up, the hash of the password is stored in the database. When the user logs in again,
                    the hash of the entered password is compared to the hash stored in the database. If they match, the
                    user is authenticated.
                </p>
                <h3 className="text-2xl font-semibold border-b pt-2 pb-1 mb-1">Try it out!</h3>
                <p>
                    The database table on the right now has its passwords hashed using the MD5 algorithm. Try entering
                    a password here to see if the hashes match:
                </p>
                <Input className="my-2" placeholder="Type your text to hash here" value={text}
                       onChange={onChangeHandler}/>
                <p>
                    <b className="font-semibold">Hashed text</b>: {MD5(text).toString()}
                </p>
                <h3 className="text-2xl font-semibold border-b pt-4 pb-1 mb-1">Evaluation</h3>
                <p>
                    Is this secure? Kind of. It is certainly more secure than using two-way encryption. However, it has
                    a critical flaw. If the attacker has a list of common passwords and their hashes, they can compare
                    the hashes to the ones in the database to find the passwords.
                </p>
            </div>
        }
        table={
            <Table>
                <TableHeader className="sticky top-0 bg-neutral-50">
                    <TableRow>
                        <TableHead className="w-[150px]">username</TableHead>
                        <TableHead className="w-[150px]">md5_hashed_password</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {hashedData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{row.username}</TableCell>
                            <TableCell>{row.password}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        }
    />;
}

function Slide5() {
    const [text, setText] = useState("");
    const onChangeHandler = (event) => {
        setText(event.target.value);
    };
    const hashedData = tableData.map(row => {
        const salt = deterministicRandomString(row.username, 7);
        return {
            username: row.username,
            password: MD5(row.password + salt).toString(),
            salt: salt
        };
    });
    return <Slide
        title="Idea #3: Hashing + Salting"
        text={
            <div>
                <h3 className="text-2xl font-semibold border-b pb-1 mb-1">Adding salts</h3>
                <p className="pb-1">
                    We can append a random string of characters to the password before hashing it. This random string is
                    called a salt. The salt is stored in the database along with the hash.
                </p>
                <p>
                    This prevents the previously described "rainbow table attack" because now the attacker will have to
                    generate a new rainbow table for each salt.
                </p>
                <h3 className="text-2xl font-semibold border-b pt-2 pb-1 mb-1">Try it out!</h3>
                <p>
                    The database table on the right now has its passwords hashed using the MD5 algorithm, PLUS the salt.
                    Try entering a password (with its salt) here to see if the hashes match:
                </p>
                <Input className="my-2" placeholder="Type your text to hash here" value={text}
                       onChange={onChangeHandler}/>
                <p>
                    <b className="font-semibold">Hashed text</b>: {MD5(text).toString()}
                </p>
                <h3 className="text-2xl font-semibold border-b pt-4 pb-1 mb-1">Evaluation</h3>
                <p>
                    Is this secure? It is pretty secure. Even if the attacker has a list
                    of common passwords and their hashes, they cannot use it to find the passwords in the database at a
                    reasonable speed.
                </p>
            </div>
        }
        table={
            <Table>
                <TableHeader className="sticky top-0 bg-neutral-50">
                    <TableRow>
                        <TableHead className="w-[150px]">username</TableHead>
                        <TableHead className="w-[150px]">md5_hashed_password_with_salt</TableHead>
                        <TableHead className="w-[150px]">salt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {hashedData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{row.username}</TableCell>
                            <TableCell>{row.password}</TableCell>
                            <TableCell>{row.salt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        }
    />;
}

function Slide6() {
    const hashedData = tableData.map(row => {
        const salt = deterministicRandomString(row.username, 7);
        return {
            username: row.username,
            password: MD5(row.password + salt).toString(),
            salt: salt
        };
    });
    return <Slide
        title="Improvements"
        text={
            <div>
                <p>How can we improve this approach?</p>
                <ul className="list-disc list-inside pl-6">
                    <li>
                        Use more secure hashing algorithms like SHA-512
                    </li>
                    <li>
                        Better: use slow hashing algorithms like Argon2 or scrypt
                    </li>
                    <li>
                        Use a pepper: a secret key that is stored separately
                    </li>
                    <li>
                        Rate-limiting or account lockout
                    </li>
                    <li>
                        Enforce complex passwords
                    </li>
                    <li>
                        Multi-factor authentication
                    </li>
                </ul>
            </div>
        }
        table={
            <Table>
                <TableHeader className="sticky top-0 bg-neutral-50">
                    <TableRow>
                        <TableHead className="w-[150px]">username</TableHead>
                        <TableHead className="w-[150px]">md5_hashed_password_with_salt</TableHead>
                        <TableHead className="w-[150px]">salt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {hashedData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{row.username}</TableCell>
                            <TableCell>{row.password}</TableCell>
                            <TableCell>{row.salt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        }
    />;
}

export default function Home() {
    const n_slides = 7;
    const [currentSlide, setCurrentSlide] = useState(1);

    return (
        <div className="flex flex-col w-screen h-screen px-10 py-6">
            {
                currentSlide === 1 ? <TitleSlide/> :
                    currentSlide === 2 ? <Slide2/> :
                        currentSlide === 3 ? <Slide3/> :
                            currentSlide === 4 ? <Slide4/> :
                                currentSlide === 5 ? <Slide5/> :
                                    currentSlide === 6 ? <Slide6/> :
                                        currentSlide === 7 ? <FinalSlide/> : null
            }
            <div className="flex flex-row gap-3 items-center justify-center">
                {
                    [...Array(n_slides).keys()].map(i => i + 1).map((index) => {
                        return index === currentSlide ?
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className="flex rounded-full h-9 w-9 items-center justify-center bg-blue-50 font-semibold text-blue-700 border border-blue-400 hover:bg-blue-100 transition ease-in-out duration-300">
                                {index}
                            </button>
                            :
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className="flex rounded-full h-9 w-9 items-center justify-center font-semibold text-neutral-700 border border-neutral-300 hover:bg-neutral-100 transition ease-in-out duration-300">
                                {index}
                            </button>;
                    })
                }
            </div>
        </div>
    );
}
