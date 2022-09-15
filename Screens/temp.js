`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Student: Chirag Kothari
// Roll.no:EE190002016
// 
// Create Date: 29/07/2021 13:52:21 PM
// Design Name: 

// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Module Name: fifo_project

//////////////////////////////////////////////////////////////////////////////////

//First In, First Out (FIFO) is an accounting method in which assets purchased or acquired first are disposed of first.

//define variables first then we will go through the algorithmic part

`define FIFO_width  3   

`define inputs_fifo 10  //number of inputs_fifo required are 10 and precision is 16

//module start

module fifo_project ( clck, reset, data_input, 
    data_output, write_en, read_en, ct_empty, ct_full, 
    fifo_ct );

input                 reset, clck, write_en, read_en;


input [15:0]           data_input;    // input data of 16 bits.


output[15:0]           data_output;    // output data of 16 bits.   


output                ct_empty, ct_full;    //variables to store empty and full condition of fifo  

output[`FIFO_width :0] fifo_ct;             


reg[15:0]              data_output;
reg                   ct_empty, ct_full;
reg[`FIFO_width :0]    fifo_ct;
reg[`FIFO_width -1:0]  rd_ptr, wr_ptr;            
reg[15:0]              buf_mem[`inputs_fifo -1 : 0];  

always @(fifo_ct)
begin
   ct_empty = (fifo_ct==0);   // Checking for whether fifo is empty 
   ct_full = (fifo_ct== `inputs_fifo);  //Check if fifo is full

end

// we will be setting counter values for fifo for different operations


always @(posedge clck or posedge reset) //Set FIFO counter value for different read and write operations.
begin
   if( reset )
       // Couter reset for FIFO
       fifo_ct <= 0;		

   else if( (!ct_full && write_en) && ( !ct_empty && read_en ) )  
       //if doing read and write operation simultaneously, counter value won't change
       fifo_ct <= fifo_ct;			

   else if( !ct_full && write_en )	
        //Write operation
       fifo_ct <= fifo_ct + 1;

   else if( !ct_empty && read_en )		
        //Read peration
       fifo_ct <= fifo_ct - 1;

   else
      //Nothing
      fifo_ct <= fifo_ct;			
end

//Now we will be taking account of reset and read pointer


always @( posedge clck or posedge reset)
begin
   if( reset )
      //If reset, output of buffer will be 0
      data_output <= 0;		
   else
   begin
      if( read_en && !ct_empty )
         //Taking input from the buffer location indicated by read pointer
         data_output <= buf_mem[rd_ptr];	

      else
         data_output <= data_output;		

   end
end

//Now we will be writing input to write pointer

always @(posedge clck)
begin
   if( write_en && !ct_full )
      //Writing input to buffer location indicated by write pointer
      buf_mem[ wr_ptr ] <= data_input;		

   else
      buf_mem[ wr_ptr ] <= buf_mem[ wr_ptr ];
end

//Here we will be resetting read and write pointers

always@(posedge clck or posedge reset)
begin
   if( reset )
   begin
      // Initializing write pointer
      wr_ptr <= 0;		
      //Initializing read pointer
      rd_ptr <= 0;		
   end
   else
   begin
      if( !ct_full && write_en )    
            // Write pointer will point to next location to be written
			wr_ptr <= wr_ptr + 1;		
      else  
			wr_ptr <= wr_ptr;

      if( !ct_empty && read_en )   
            // Read pointer will point to next location to be read
			rd_ptr <= rd_ptr + 1;		
      else 
			rd_ptr <= rd_ptr;
   end

end
endmodule

//end module

