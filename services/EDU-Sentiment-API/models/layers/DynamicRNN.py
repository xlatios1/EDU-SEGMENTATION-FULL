# coding: utf-8
#
# Copyright 2018 Yequan Wang
# Author: Yequan Wang (tshwangyequan@gmail.com)
#

from __future__ import unicode_literals, print_function, division

import torch
import torch.nn as nn
from torch.autograd import Variable
from torch.nn.utils.rnn import pack_padded_sequence, pad_packed_sequence


class DynamicRNN(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers=1, bias=True, batch_first=True, dropout=0, 
                        bidirectional=False, rnn_type='LSTM', compute_device=None):
        super(DynamicRNN, self).__init__()
        self.batch_first = batch_first
        self.compute_device = compute_device
        self.add_module('rnn', getattr(nn, rnn_type)(input_size=input_size, hidden_size=hidden_size, num_layers=num_layers, 
                                                            bias=bias, batch_first=batch_first, dropout=dropout, bidirectional=bidirectional))

    def forward(self, input, hidden_in=None, lengths=None, flag_ranked=True):

        '''
            input, lengths are not ranked;
            idx_rank: ranked lengths;
            idx_retrieve: to rerank the encoded results
        '''
        if flag_ranked == True:
            lengths_ranked, input_ranked = lengths, input
        else:
            lengths_ranked, indices = torch.sort(lengths, dim=0, descending=True)
            _, idx_r = torch.sort(indices, descending=False)


            # idx_r = Variable(idx_r).cuda() if self.use_cuda else Variable(idx_r)
            idx_r = Variable(idx_r).to(self.compute_device)
            idx_select = Variable(indices).to(self.compute_device)
            # import pdb
            # pdb.set_trace()
            input_ranked = torch.index_select(input, dim=0, index=idx_select)

        input_packed = pack_padded_sequence(input_ranked, lengths=lengths_ranked.cpu().numpy(), batch_first=self.batch_first)
        output_packed, hidden = self.rnn(input_packed, hidden_in)
        output_pad, output_len = pad_packed_sequence(output_packed, batch_first=self.batch_first)

        if flag_ranked:
            return output_pad, hidden
        else:
            output_pad_ranked = torch.index_select(output_pad, dim=0, index=idx_r)
            if isinstance(hidden, tuple):
                hidden_ranked = tuple([torch.index_select(tmp, dim=1, index=idx_r) for tmp in hidden])
            else:
                hidden_ranked = torch.index_select(hidden, dim=1, index=idx_r)
            return output_pad_ranked, hidden_ranked
