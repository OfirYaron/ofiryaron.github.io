[_metadata_:author]:- "Ofir Yaron"
[_metadata_:title]:- "Useful Bash Commands"
[_metadata_:tags]:- "bash,commands"
[_metadata_:date]:- "2/4/2023"

By mastering commonly used Bash commands and exploring more advanced ones, you can become a more efficient and effective user of the command line. By automating repetitive tasks with scripts, you can reduce the risk of mistakes and free up your time to focus on more productive work. In this post, we'll cover a range of useful Bash commands and show you how to use them to streamline your workflow and automate tasks.

## Basic Commands

- **ls**: Lists the contents of the current directory.
- **cd**: Changes the current working directory.
- **pwd**: Prints the current working directory.
- **mkdir**: Creates a new directory.
- **rmdir**: Deletes an empty directory.
- **touch**: Creates a new empty file or updates the modification time of an existing file.

## File Manipulation Commands

- **cp**: Copies a file from one location to another.
- **mv**: Moves or renames a file or directory.
- **rm**: Deletes a file or directory.
- **cat**: Displays the contents of a file.
- **grep**: Searches for a specific pattern in a file.
- **head**: Displays the first few lines of a file.
- **tail**: Displays the last few lines of a file.
- **diff**: Compares two files and displays the differences.

## System Information Commands

- **top**: Displays real-time information about the processes running on the system.
- **ps**: Shows information about the processes currently running on the system.
- **df**: Displays information about disk usage on the system.
- **free**: Shows information about the system's memory usage.
- **uname**: Prints information about the system, such as the kernel version and operating system name.

## Network Commands

- **ping**: Tests connectivity to a specific host or IP address.
- **nslookup**: Looks up the IP address of a specific host.
- **wget**: Downloads files from the internet.
- **curl**: Sends HTTP requests and displays the response.
- **These** are just a few examples of commonly used Bash commands. 

## Advanced Commands

- **find**: Searches for files and directories that match a specific set of criteria. For example, to find all files with a .txt extension in the current directory and its subdirectories, you can use:
<code language='bash'>
find . -name "**.txt"
</code>

- **grep**: Searches for a specific pattern in a file. To search for the string "hello" in all .txt files in the current directory, you can use:
<code language='bash'>
grep "hello" **.txt
</code>

- **sed**: Stream editor for filtering and transforming text. To replace all occurrences of the string "foo" with "bar" in a file, you can use:
<code language='bash'>
sed 's/foo/bar/g' myfile.txt
</code>

- **awk**: Powerful text-processing tool for manipulating structured data. To print the second column of a CSV file, you can use:
<code language='bash'>
awk -F ',' '{print $2}' myfile.csv
</code>

### Pipes

Pipes (|) are used to redirect the output of one command as input to another command. This allows you to chain together commands to perform more complex operations. Here are a few examples:

To find all files with a .txt extension and count the number of lines in each file, you can use:
<code language='bash'>
find . -name "*.txt" | xargs wc -l
</code>
The find command searches for all .txt files, and the output is piped to xargs, which passes each file as an argument to the wc -l command to count the number of lines.
To search for a specific string in all .txt files in the current directory and display the matching lines, you can use:
<code language='bash'>
grep "search string" *.txt | awk '{print "File: " $2 " - " $0}'
</code>
The grep command searches for the specified string in all .txt files, and the output is piped to awk, which formats the output to display the matching lines with the corresponding file name.
Pipes are a powerful tool for combining and manipulating data in the command line, and mastering them can greatly improve your productivity as a Bash user.


## Additional Useful Commands
Get Local IP
```
curl ifconfig.me
```

Get IP from terminal:
```
wget -qO- https://ipecho.net/plain ; echo
```

Get response from EKS pod by it’s IP:
```
wget -qO- http://10.1.1.249:8080/ ; echo
```

Handy git pull:
```
find . -type d -depth 1 -exec git --git-dir={}/.git --work-tree=$PWD/{} pull \;
```
This bash command uses the find command to search for directories (-type d) in the current directory (.), at a depth of 1 (-depth 1). For each directory found, it runs the git pull command in that directory (-exec git --git-dir={}/.git --work-tree=$PWD/{} pull \;).

Here's a breakdown of what each part of the command does:

- **find .**: Search for files/directories in the current directory (".")
- **type d**: Only look for directories
- **depth 1**: Only look at directories that are one level deep (i.e., not recursive)
- **exec**: Run the following command for each directory found
- **git --git-dir={}/.git --work-tree=$PWD/{} pull**: This runs the git pull command in each directory found by find. The {} is a placeholder for the directory name found by find, so for each directory found, the command substitutes {} with the directory name. The --git-dir option specifies the path to the .git directory for the repository, and the --work-tree option specifies the working tree (i.e., the top-level directory of the repository).
\;: The semicolon indicates the end of the command passed to *-exec*.


In summary, this command searches for directories in the current directory that contain a Git repository, and runs git pull in each repository to fetch and merge any changes from the remote repository.