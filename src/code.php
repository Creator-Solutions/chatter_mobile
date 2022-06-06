

        if ($conn)
        {
            self::$email = self::$decodedData['Email'] ?? "";
            self::$password = password_hash(self::$decodedData['Password'], PASSWORD_ARGON2ID) ?? "";
            self::$fullName = self::$decodedData['FullName'] ?? "";
            self::$uuid = self::uuidv4();

            self::$response[] = array('Email' => self::$email, 'Name' => self::$fullname, 'UUID' => self::$uuid, 'Pass' => self::$password);
        }