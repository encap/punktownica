<?php
$servername = "***********";
$username = "**************";
$password = "**********";
$dbname = "punktownica";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8");

$nick = $_POST["nick"];
$type = '0'; // rozwiniete egzaminy
//zapamietaj
if(isset($_POST['submit']))
{
  $nick = $_POST["nick"];
  $nickType = $_POST["nickType"];
  $points = $_POST["points"];
  $pol = $_POST["pol"];
  $mat = $_POST["mat"];
  $ang = $_POST["ang"];
  $fiz = $_POST["fiz"];
  $ehis = $_POST["ehis"];
  $epol = $_POST["epol"];
  $efiz = $_POST["efiz"];
  $emat = $_POST["emat"];
  $eang = $_POST["eang"];
  $volo = $_POST["volo"];
  if($_POST['togglePasek'] == "true"){
      $pasek = 'checked';
  } else {
    $pasek = '';
  }
  $kon1 = $_POST["kon1"];
  $kon2 = $_POST["kon2"];
  $kon3 = $_POST["kon3"];

  $sql="SELECT * FROM data WHERE nick = '$nick';";
  $query = mysqli_query($conn, $sql);
      if (!$query)
      {
        //  die('blad wyszukiwania: ' . mysqli_error($con));
      }

  if(mysqli_num_rows($query) > 0){
  // zaaktualizuj
    // $sql = "UPDATE data SET points=?, pol=?, mat=?, ang=?, fiz=?, ehis=?, epol=?, efiz=?, emat=?, eang=?, volo=?, pasek=?, kon1=?, kon2=?, kon3=? WHERE nick=?;";
    // $stmt = $conn->prepare($sql);
    //   if (
    //     $stmt &&
    //     $stmt -> bind_param("ssssssssssssssss", $points, $pol, $mat, $ang, $fiz, $ehis, $epol, $efiz, $emat, $eang, $volo, $pasek, $kon1, $kon2, $kon3, $nick) &&
    //     $stmt -> execute() &&
    //     $stmt -> affected_rows === 1
    //   ) {
    //     echo 'updated';
    //   } else {
    //     echo 'update-error';
    //     echo $stmt -> error;
    //   }
    $sql = "UPDATE data SET
          points = '$points',
          pol = '$pol', mat = '$mat', ang = '$ang', fiz = '$fiz',
          type = '$type',
          ehis = '$ehis', epol = '$epol', efiz = '$efiz', emat = '$emat', eang = '$eang',
          volo = '$volo', pasek = '$pasek', kon1 = '$kon1', kon2 = '$kon2', kon3 = '$kon3'
          WHERE nick = '$nick';";
          if ($conn->query($sql) === TRUE) {
            echo 'updated';
          } else {
            echo 'update-error';
          }


  } else {
    // utwórz nowy
    $sql = "INSERT INTO data (nick, nick_type, points, pol, mat, ang, fiz, type, ehis, epol, efiz, emat, eang, volo, pasek, kon1, kon2, kon3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
      if (
      	$stmt &&
      	$stmt -> bind_param("ssssssssssssssssss", $nick, $nickType, $points, $pol, $mat, $ang, $fiz, $type, $ehis, $epol, $efiz, $emat, $eang, $volo, $pasek, $kon1, $kon2, $kon3) &&
      	$stmt -> execute() &&
      	$stmt -> affected_rows === 1
      ) {
      	echo 'inserted';
      } else {
        echo 'insert-error';
        echo $stmt -> error;
      }
  }


} // koniec isset submit

// z bazy
if (isset($_POST["retrieve"]) && !empty($nick)) {
  $sql="SELECT * FROM data WHERE nick = '$nick';";
  $result=mysqli_query($conn, $sql);
  if(mysqli_num_rows($result) == 1) {
    $row=mysqli_fetch_assoc($result);
    //array_push($row, $nick);
    echo json_encode($row);
  } else {
    echo 'noExist';
  }
}

$conn->close();
?>
