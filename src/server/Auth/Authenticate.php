<?php

require '../conn.php';
header('Access-Control-Allow-Origin: http://192.168.0.1:3000');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type");
class Authenticate
{

    private static DatabaseHelper $dbHelper;

    private static $SQL;
    private static $stmt;
    private static $row;
    private static Array $response;

    private static $encodedData;
    private static $decodedData;

    private static string $Message;
    private static string $email;
    private static string $password;
    private static string $fullName;
    private static string $uuid;

    public function __construct() 
    {
        self::$dbHelper = new DatabaseHelper;
        self::$dbHelper::init();

        self::$encodedData = file_get_contents("php://input");
        self::$decodedData = json_decode(self::$encodedData, true);
        
        if (self::$decodedData['Type'] == 'Login'){
            self::Authenticate(self::$dbHelper::$conn);      
        }elseif (self::$decodedData['Type'] == 'Register') {
            self::create(self::$dbHelper::$conn);
        }        
    }

    public static function Authenticate($conn)
    {
        if ($conn)
        {
            self::$email = self::$decodedData['Email'] ?? "";
            self::$password = self::$decodedData['Password'] ?? "";

            try
            {              
                self::$SQL = "SELECT * FROM users WHERE Email=?";
                self::$stmt = $conn->prepare(self::$SQL);
                self::$stmt->bindValue(1, self::$email, PDO::PARAM_STR);
                self::$stmt->execute();

                self::$row = self::$stmt->fetch();
                
                if (isset(self::$row['UUID']))
                {
                    if (password_verify(self::$password, self::$row['Password']))
                    {
                        self::$Message = "Authenticated"; 
                        self::$response[] = array('Message' => self::$Message, 'Name' => self::$row['FullName'], 'UUID' => self::$row['UUID']);                   
                    }else 
                    {
                        self::$Message = "Incorrect Password";   
                        self::$response[] = array('Message' => self::$Message);                   
                    }
                }else
                {                   
                    self::$Message = "Account Not Found";                   
                    self::$response[] = array('Message' => self::$Message);
                }              
            }catch (Exception $ex)
            {
                self::$Message = $ex;
                self::$response[] = array('Message' => self::$Message);
            }           

        }          
       echo json_encode(self::$response);
    }

    public static function create($conn)
    {
        if ($conn)
        {
            self::$email = self::$decodedData['Email'] ?? "";
            self::$password = password_hash(self::$decodedData['Password'], PASSWORD_ARGON2ID) ?? "";
            self::$fullName = self::$decodedData['FullName'] ?? "";
            self::$uuid = self::uuidv4();

            try
            {                            
                self::$SQL = "INSERT INTO users (UUID, FullName, Email, Password ) VALUES (?,?,?,?)";
                self::$stmt = $conn->prepare(self::$SQL);
                self::$stmt->bindValue(1, self::$uuid, PDO::PARAM_STR);
                self::$stmt->bindValue(2, self::$fullName, PDO::PARAM_STR);
                self::$stmt->bindValue(3, self::$email, PDO::PARAM_STR);
                self::$stmt->bindValue(4, self::$password, PDO::PARAM_STR);
                self::$stmt->execute();

                self::$Message = "Register";
                self::$response[] = array('Message' => self::$Message);
                            
            }catch (Exception $ex)
            {
                self::$Message = "Could not create account";
                self::$response[] = array('Message' => self::$Message);
            }            
        }

        echo json_encode(self::$response);
       
    }

    public static function Check_User_Exists($conn, $email): bool
    {
        if ($conn)
        {
            try
            {

                self::$SQL = "SELECT UUID from users WHERE Email=?";
                self::$stmt = $conn->prepare(self::$SQL);
                self::$stmt->bindValue(1, $email, PDO::PARAM_STR);
                self::$stmt->execute();

                self::$row[] = self::$stmt->fetch();
                
                if (isset(self::$row['UUID']))
                {
                    return true;
                }
            }catch (Exception $ex)
            {
                return false;
            }
        }

        return false;
    }


    private static function Generate_Token()
    {
        $token = openssl_random_pseudo_bytes(16);

        return bin2hex($token);
    }

    private static function uuidv4()    
    {
        return sprintf( '%04x%04x-%04x-%04x-%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),

        mt_rand(0, 0xffff),

        mt_rand(0, 0x0fff) | 0x4000,
        
        mt_rand(0, 0x3fff) | 0x8000,

        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }    
}

$auth = new Authenticate();
