/* This is a program that attempts to make a  nxn grid
At present it does not work properly. I am not sure what is wrong */
import java.util.Scanner;
import java.util.Arrays;

public class Grid{  
  /* 0 means the walker has not been here. 1 means it has */
	static class gridSpace
	{
		int walker1 = 0;
		int walker2 = 0;
		int walker3 = 0;
		int walker4 = 0;
	}
	
	/* creates grid by creating a nxn array of gridSpace objects */
	static void arrayGrid(int r, int c)
	{
		gridSpace[][] arr;
		arr = new gridSpace[r][c];
		 for(int b = 0; b < r; b++)
		    for(int a = 0; a < c;a++)
		      arr[b][a] = new gridSpace();
		System.out.println(arr[0][0]);
	}
	
	public static void main(String[] args)
	{
		int row = 0;
		int column = 0;
		Scanner inp = new Scanner(System.in);
		System.out.println("please enter two integers");
		row = inp.nextInt();
		column = inp.nextInt();
		arrayGrid(row, column);
	}
}
